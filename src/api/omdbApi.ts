const BASE_URL = 'https://www.omdbapi.com/'
const API_KEY = import.meta.env.VITE_OMDB_API_KEY

type OmdbResponseFlag = 'True' | 'False'

type OmdbResponseEnvelope = {
  Response: OmdbResponseFlag
  Error?: string
}

export type OmdbSearchItem = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster?: string
}

export type OmdbSearchResponse = OmdbResponseEnvelope & {
  Search?: OmdbSearchItem[]
  totalResults?: string
}

export type OmdbMovieDetail = OmdbSearchItem & {
  Rated?: string
  Released?: string
  Runtime?: string
  Genre?: string
  Director?: string
  Writer?: string
  Actors?: string
  Plot?: string
  Language?: string
  Country?: string
  Awards?: string
  Ratings?: Array<{ Source: string; Value: string }>
  Metascore?: string
  imdbRating?: string
  imdbVotes?: string
  totalSeasons?: string
}

export type OmdbMovieDetailResponse = OmdbMovieDetail & OmdbResponseEnvelope

export type SearchMoviesParams = {
  query: string
  page?: number
  type?: 'movie' | 'series' | 'episode'
  year?: string
}

const ensureApiKey = () => {
  if (!API_KEY) {
    throw new Error('Falta configurar VITE_OMDB_API_KEY en el archivo .env')
  }
  return API_KEY
}

const buildUrl = (searchParams: Record<string, string>) => {
  const url = new URL(BASE_URL)
  url.search = new URLSearchParams({
    apikey: ensureApiKey(),
    ...searchParams,
  }).toString()
  return url.toString()
}

const parseResponse = async <T extends OmdbResponseEnvelope>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`Error al consultar OMDB: ${response.status}`)
  }

  const data = (await response.json()) as T
  if (data.Response === 'False') {
    throw new Error(data.Error ?? 'La API respondió con error')
  }

  return data
}

export const omdbApi = {
  async searchMovies({ query, page = 1, type, year }: SearchMoviesParams) {
    const params: Record<string, string> = { s: query, page: String(page) }
    if (type) params.type = type
    if (year) params.y = year

    const response = await fetch(buildUrl(params))
    const data = await parseResponse<OmdbSearchResponse>(response)

    return {
      items: data.Search ?? [],
      totalResults: Number(data.totalResults ?? 0),
    }
  },

  async getById(imdbID: string, plot: 'short' | 'full' = 'short') {
    const response = await fetch(buildUrl({ i: imdbID, plot }))
    return parseResponse<OmdbMovieDetailResponse>(response)
  },
}
