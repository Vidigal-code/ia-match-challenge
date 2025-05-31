/** API URL for the logo image */
const VITE_API_MATCH_LOGO_URL: string = import.meta.env.VITE_API_MATCH_LOGO_URL;
/** Configuration value for the maximum number of results to display */
export const VITE_API_MATCH_HOW_MANY_WERE_FOUND: number = import.meta.env.VITE_API_MATCH_HOW_MANY_WERE_FOUND;

/**
 * Interface representing a person's data in the matching system
 * @interface PeoplesDataMatch
 */
export interface PeoplesDataMatch {
    /** Unique identifier for the person */
    id: number;
    /** Full name of the person */
    name: string;
    /** Professional or expertise area of the person */
    area: string;
    /** Geographic location of the person */
    location: string;
    /** Brief description or bio of the person */
    description: string;
}

/**
 * Response interface for the people data API endpoint
 * @interface PeopleDataMatchResponse
 */
export interface PeopleDataMatchResponse {
    /** Array of people data objects */
    peopledatas: PeoplesDataMatch[];
}

/**
 * Extended interface for people data with affinity score
 * @interface PeoplesAffinityMatch
 * @extends PeoplesDataMatch
 */
export interface PeoplesAffinityMatch extends PeoplesDataMatch {
    /** Numeric value representing the match affinity score */
    affinity: number;
}

/**
 * Interface for form data used in matching
 * @interface FormDataMatch
 */
export interface FormDataMatch {
    /** Name entered in the form */
    name: string;
    /** Area of interest selected in the form */
    area: string;
    /** Location entered in the form */
    location: string;
}

/**
 * Interface representing an area category in the matching system
 * @interface AreasDataMatch
 */
export interface AreasDataMatch {
    /** Unique identifier for the area */
    id: number;
    /** Name of the professional or expertise area */
    area: string;
}

/**
 * Response interface for the area data API endpoint
 * @interface AreaDataMatchResponse
 */
export interface AreaDataMatchResponse {
    /** Array of area data objects */
    areadatas: AreasDataMatch[];
}

/**
 * Interface for feature cards shown on the landing page
 * @interface FeatureCardPropsLandingPage
 */
export interface FeatureCardPropsLandingPage {
    /** Title of the feature */
    title: string;
    /** Description of the feature */
    description: string;
}

/**
 * Interface for logo data
 * @interface Logo
 */
export interface Logo {
    /** Name of the logo */
    nome: string;
    /** URL of the logo image */
    logoUrl: string;
}

/**
 * Constant representing the application's logo
 * @constant logo
 */
export const logo: Logo = {
    nome: 'Logo IA-MATCH',
    logoUrl: VITE_API_MATCH_LOGO_URL
};