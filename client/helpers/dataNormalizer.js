import {
  Schema,
  arrayOf,
  normalize
} from 'normalizr';

const apiSchema = new Schema('api')
const trackSchema = new Schema('tracks')
const albumSchema = new Schema('albums')
const artistSchema = new Schema('artists')

trackSchema.define({
  album: albumSchema,
  artists: arrayOf(artistSchema)
})

/**
 *
 * @Param {items} An Array of spotify tracks {track: {}}
 *
 */

export function normalizeTrackArray(tracks) {
  return normalize(tracks, arrayOf({track :trackSchema}))
}
