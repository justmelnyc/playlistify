/*
{
    "added_at": "2016-12-10T04:13:46Z",
    "track": {
      "album": {
        "album_type": "album",
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/2bA6fzP0lMAQ4kz6CF61w8"
            },
            "href": "https://api.spotify.com/v1/artists/2bA6fzP0lMAQ4kz6CF61w8",
            "id": "2bA6fzP0lMAQ4kz6CF61w8",
            "name": "Toby Keith",
            "type": "artist",
            "uri": "spotify:artist:2bA6fzP0lMAQ4kz6CF61w8"
          }
        ],
        "available_markets": [
          "CA",
          "MX",
          "US"
        ],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/20NoLM2SnwJBPwBG6cUAld"
        },
        "href": "https://api.spotify.com/v1/albums/20NoLM2SnwJBPwBG6cUAld",
        "id": "20NoLM2SnwJBPwBG6cUAld",
        "images": [
          {
            "height": 636,
            "url": "https://i.scdn.co/image/18d9b4b80d01ad346162046972962d311b038dda",
            "width": 640
          },
          {
            "height": 298,
            "url": "https://i.scdn.co/image/8db8aed41e56b70f87ea9cb116f2338d81b971ca",
            "width": 300
          },
          {
            "height": 64,
            "url": "https://i.scdn.co/image/e7e040dc8aacc663c41d3252d7289f51ce512118",
            "width": 64
          }
        ],
        "name": "20th Century Masters : The Millennium Collection : Best Of Toby Keith",
        "type": "album",
        "uri": "spotify:album:20NoLM2SnwJBPwBG6cUAld"
      },
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/2bA6fzP0lMAQ4kz6CF61w8"
          },
          "href": "https://api.spotify.com/v1/artists/2bA6fzP0lMAQ4kz6CF61w8",
          "id": "2bA6fzP0lMAQ4kz6CF61w8",
          "name": "Toby Keith",
          "type": "artist",
          "uri": "spotify:artist:2bA6fzP0lMAQ4kz6CF61w8"
        }
      ],
      "available_markets": [
        "CA",
        "MX",
        "US"
      ],
      "disc_number": 1,
      "duration_ms": 209626,
      "explicit": false,
      "external_ids": {
        "isrc": "USPR39402268"
      },
      "external_urls": {
        "spotify": "https://open.spotify.com/track/1Zocw1rD4cBv1rRRsFI0Pj"
      },
      "href": "https://api.spotify.com/v1/tracks/1Zocw1rD4cBv1rRRsFI0Pj",
      "id": "1Zocw1rD4cBv1rRRsFI0Pj",
      "name": "Should've Been A Cowboy",
      "popularity": 51,
      "preview_url": "https://p.scdn.co/mp3-preview/116944c4364a4a0c0ef5b7cc437dfdbc8fd5876e?cid=1ceb6941fede43ed894262ff92fa3eeb",
      "track_number": 1,
      "type": "track",
      "uri": "spotify:track:1Zocw1rD4cBv1rRRsFI0Pj"
    }
  },
*/

import {
  Schema,
  arrayOf
} from 'normalizr';

const apiSchema = new Schema('api')
const trackSchema = new Schema('tracks')
const albumSchema = new Schema('albums')
const artistSchema = new Schema('artists')

trackSchema.define({
  album: albumSchema,
  artists: arrayOf(artistSchema)
})

export {
  trackSchema
}
