import {
    FormDataMatch,
    PeoplesAffinityMatch,
    PeoplesDataMatch,
    VITE_API_MATCH_HOW_MANY_WERE_FOUND
} from "./Interface.ts";

/**
 * Finds matches based on form data and updates the state with results
 *
 * @param {FormDataMatch} formData - The user's input form data
 * @param {PeoplesDataMatch[]} _potentialPeopleResults - List of potential people to match with
 * @param {Function} setMatches - State setter for updating matches
 * @param {Function} setIsLoading - State setter for loading indicator
 * @param {Function} setShowResults - State setter for showing results
 * @param {Function} setErrorMessage - State setter for error messages
 * @param {number} maxResults - Maximum number of results to return
 * @returns {void}
 */
export const findMatches = (
    formData: FormDataMatch,
    _potentialPeopleResults: PeoplesDataMatch[],
    setMatches: (matches: PeoplesAffinityMatch[]) => void,
    setIsLoading: (isLoading: boolean) => void,
    setShowResults: (showResults: boolean) => void,
    setErrorMessage: (errorMessage: string | null) => void,
): void => {
    // Form validation
    if (!formData.name) {
        setErrorMessage("Por favor, preencha o campo de nome.");
        return;
    }

    if (!formData.area) {
        setErrorMessage("Por favor, selecione sua área de interesse.");
        return;
    }

    if (!formData.location) {
        setErrorMessage("Por favor, informe sua localização.");
        return;
    }

    // Reset state and show loading
    setIsLoading(true);
    setShowResults(false);
    setErrorMessage(null);

    setTimeout(() => {
        // Filter out the current user from potential matches
        const filteredMatches = _potentialPeopleResults.filter(person =>
            person.name.toLowerCase() !== formData.name.toLowerCase()
        );

        if (filteredMatches.length === 0) {
            setMatches([]);
            setIsLoading(false);
            setShowResults(true);
            return;
        }

        // Calculate affinity scores for each potential match
        const matchesWithAffinity: PeoplesAffinityMatch[] = filteredMatches.map(person => ({
            ...person,
            affinity: calculateAffinityScore(person, formData)
        }));

        // Sort by affinity score and limit to configured number of results
        const topMatches = matchesWithAffinity
            .sort((a, b) => b.affinity - a.affinity)
            .slice(0, VITE_API_MATCH_HOW_MANY_WERE_FOUND);

        setMatches(topMatches);
        setIsLoading(false);
        setShowResults(true);
    }, 1500);
};

/**
 * Calculates an affinity score between the user and a potential match
 * Combines scores from area, location, and adds randomization
 *
 * @param {PeoplesDataMatch} person - The potential match to calculate affinity for
 * @param formData
 * @returns {number} - A score between 0-100 representing match affinity
 */
export const calculateAffinityScore = (person: PeoplesDataMatch,
                                       formData: FormDataMatch): number => {
    let score = 0;

    // Calculate area match score
    score += calculateFieldScore(
        person.area,
        formData.area,
        {exact: 50, partial: 25, threshold: 0.6}
    );

    // Calculate location match score
    score += calculateFieldScore(
        person.location,
        formData.location,
        {exact: 30, partial: 15, threshold: 0.5}
    );

    // Add randomization factor
    score += Math.floor(Math.random() * 20);

    // Cap the score at 100
    return Math.min(score, 100);
};

/**
 * Calculates a similarity score between two string values
 * Uses multiple strategies: exact match, substring match,
 * Levenshtein distance, and common word analysis
 *
 * @param {string} value1 - First string to compare
 * @param {string} value2 - Second string to compare
 * @param {Object} options - Scoring configuration
 * @param {number} options.exact - Score for exact match
 * @param {number} options.partial - Maximum score for partial match
 * @param {number} options.threshold - Minimum similarity threshold
 * @returns {number} - The calculated similarity score
 */
export const calculateFieldScore = (
    value1: string,
    value2: string,
    options: { exact: number, partial: number, threshold: number }
): number => {
    const s1 = value1.toLowerCase();
    const s2 = value2.toLowerCase();

    // Check for exact match
    if (s1 === s2) {
        return options.exact;
    }

    // Check for substring match
    if (s1.includes(s2) || s2.includes(s1)) {
        return Math.floor(options.partial * 0.8);
    }

    // Calculate Levenshtein distance and similarity ratio
    const distance = levenshteinDistance(s1, s2);
    const maxLength = Math.max(s1.length, s2.length);

    if (maxLength === 0) return 0;

    const similarity = 1 - (distance / maxLength);

    // If similarity ratio exceeds threshold, award partial score
    if (similarity >= options.threshold) {
        return Math.floor(similarity * options.partial);
    }

    // Compare individual words for common terms
    const words1 = new Set(s1.split(' ').filter(w => w.length > 2));
    const words2 = new Set(s2.split(' ').filter(w => w.length > 2));

    let commonWords = 0;
    words1.forEach(word => {
        if (words2.has(word)) commonWords++;
    });

    // Calculate score based on ratio of common words
    if (commonWords > 0) {
        const totalUniqueWords = new Set([...words1, ...words2]).size;
        const wordSimilarity = totalUniqueWords > 0 ? commonWords / totalUniqueWords : 0;
        return Math.floor(wordSimilarity * options.partial);
    }

    return 0;
};

/**
 * Calculates the Levenshtein distance between two strings
 * Uses dynamic programming approach with a matrix
 *
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - The Levenshtein distance
 */
export const levenshteinDistance = (str1: string, str2: string): number => {
    const m = str1.length;
    const n = str2.length;

    // Initialize distance matrix
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    // Initialize first row and column
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    // Fill the matrix
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,      // deletion
                dp[i][j - 1] + 1,      // insertion
                dp[i - 1][j - 1] + cost // substitution
            );
        }
    }

    // Return the final distance
    return dp[m][n];
};