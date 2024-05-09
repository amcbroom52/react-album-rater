"use strict";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:5000";

/** AlbumRaterApi Class
 *
 * Class with static methods to recieve data from the Album Rater backend
 */

class AlbumRaterApi {
  static token = null;

  /** General request method to be used by other methods
   *
   * takes information on the request being made, makes that request to the
   * backend, and returns the data sent back
   */
  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      // authorization: `Bearer ${AlbumRaterApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        console.error("API Error:", resp.statusText, resp.status);
        const message = (await resp.json()).error.message;
        throw Array.isArray(message) ? message : [message];
      }

    return await response.json();
  }

  /** Gets data of all ratings in the database
   *
   * returns [{
   *    id,
   *    rating,
   *    favoriteSong,
   *    text,
   *    timestamp,
   *    author,
   *    album: { id, name, imageUrl, artistName, artistId }
   *  },...]
   */
  static async getRatings() {
    const response = await this.request('/ratings');
    return response.ratings;
  }
}

export {AlbumRaterApi}