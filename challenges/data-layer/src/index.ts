export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}
export interface Book extends DataEntity {
  title: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
  book: Book;
};

// type DECapKey<K> = `${Capitalize<string & K>}`
// type DEValues = DataEntityMap[keyof DataEntityMap]

type GetAll = { [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][] }
type Add = { [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (data: DataEntityMap[K]) => DataEntityMap[K] }
type Clear = { [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void }

// type AddData = {
// 	[K in keyof DataEntityMap]: (data: DataEntityMap[K]) => DataEntityMap[K]
// }

export type DataStoreProps = GetAll & Add & Clear

export class DataStore implements DataStoreProps {
	public songs: Song[] = []
	public movies: Movie[] = []
	public books: Book[] = []

	public getAllSongs: () => Song[] = () => this.songs
	public getAllMovies: () => Movie[] = () => this.movies
	public getAllBooks: () => Book[] = () => this.books

	public addSong: (data: Song) => Song = (data) => { 
		this.songs.push(data)
		return data
	}
	public addMovie: (data: Movie) => Movie = (data) => { 
		this.movies.push(data)
		return data
	}

	public clearSongs: () => void = () => this.songs = []
	public clearMovies: () => void = () => this.movies = []
}
