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
      authorization: `Bearer ${AlbumRaterApi.token}`,
      'content-type': 'application/json',
    };

    console.log("HEADERS", headers);
    console.log("TOKEN",AlbumRaterApi.token);

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const response = await fetch(url, { method, body, headers });


    if (!response.ok) {
      console.error("API Error:", response.statusText, response.status);
      const message = (await response.json()).errors;
      throw Array.isArray(message) ? message : [message];
    }

    return await response.json();
  }


  /** Verifies given username and password
   *
   * Returns user token jwt token if valid combination
   */

  static async login(username, password) {
    console.log("USERNAME AND PASSWORD", username, password);
    const response = await this.request('login', { username, password }, 'POST');
    return response.token;
  }

  /** Sends a request to create a new user in the database
   *
   * Return user token jwt if user is successfully created
   */

  static async signup(username, firstName, lastName, password) {
    console.log("USERNAME, FIRSTNAME, LASTNAME, PASSWORD",
      username, firstName, lastName, password);

    const response = await this.request(
      'signup',
      {username, firstName, lastName, password},
      "POST"
    );
    return response.token;
  }


  /** Gets data of a user in the database
   *
   * returns {
   *    id,
   *    firstName,
   *    lastName,
   *    imageUrl,
   *    bio,
   *  }
   */

  static async getUser(username) {
    const response = await this.request(`users/${username}`);
    return response.user;
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
    const response = await this.request('ratings');
    return response.ratings;
  }


  /** Gets data of a single rating in the database
   *
   * returns {
   *    id,
   *    rating,
   *    favoriteSong,
   *    text,
   *    timestamp,
   *    author,
   *    album: { id, name, imageUrl, artistName, artistId }
   *  }
   */

  static async getRating(ratingId) {
    const response = await this.request(`ratings/${ratingId}`);
    return response.rating;
  }
}

export { AlbumRaterApi };