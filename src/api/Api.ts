/**
 * Contains functions for fetching people and area data from API endpoints
 */
import { AreasDataMatch, AreaDataMatchResponse, PeoplesDataMatch, PeopleDataMatchResponse } from "../types/Interface.ts";

/** API endpoint URL for people data matching */
const VITE_API_MATCH_PEOPLES_DATA: string = import.meta.env.VITE_API_MATCH_PEOPLES_DATA;
/** API endpoint URL for area data matching */
const VITE_API_MATCH_AREAS_DATA: string = import.meta.env.VITE_API_MATCH_AREAS_DATA;

/**
 * Fetches people data from the API and updates state with the results
 *
 * @param {function} setPotentialPeopleResults - State setter function to update the people data results
 * @returns {void}
 */
export function getPeopleDatas(
    setPotentialPeopleResults: (data: PeoplesDataMatch[]) => void,
): void {
    fetch(VITE_API_MATCH_PEOPLES_DATA)
        .then(response => {
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            return response.json();
        })
        .then((data: PeopleDataMatchResponse) => {
            if (data && data.peopledatas) {
                setPotentialPeopleResults(data.peopledatas);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

/**
 * Fetches area data from the API and updates state with the results
 *
 * @param {function} setPotentialAreaDataResults - State setter function to update the area data results
 * @returns {void}
 */
export function getAreaDatas(
    setPotentialAreaDataResults: (data: AreasDataMatch[]) => void,
): void {
    fetch(VITE_API_MATCH_AREAS_DATA)
        .then(response => {
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            return response.json();
        })
        .then((data: AreaDataMatchResponse) => {
            if (data && data.areadatas) {
                setPotentialAreaDataResults(data.areadatas);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}