/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongs(playlistId) {
    const query = {
      text: `SELECT s.id, s.title, s.performer FROM songs s
      LEFT JOIN playlist_songs ps ON ps.song_id = s.id
      WHERE ps.playlist_id = $1
      GROUP BY s.id`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistSongsService;
