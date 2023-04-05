export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}
export interface Flag extends DataEntity {
  pattern: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
  // flag: Flag;
};

type Lists<T> = {
    [K in keyof T as `all${Capitalize<string & K>}s`]: T[K][]
};

type SingleGetters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

type MultiGetters<T> = {
    [K in keyof T as `getAll${Capitalize<string & K>}s`]: () => T[K][]
};

type Adders<T> = {
    [K in keyof T as `add${Capitalize<string & K>}`]: (data: T[K]) => T[K]
};

type Clearers<T> = {
    [K in keyof T as `clear${Capitalize<string & K>}s`]: () => void
};

type DataStoreProps = Lists<DataEntityMap> & SingleGetters<DataEntityMap> & MultiGetters<DataEntityMap> & Adders<DataEntityMap> & Clearers<DataEntityMap>;

export class DataStore implements DataStoreProps {
    allSongs: Song[] = [];
    getSong: () => Song = () => ({ id: '1', singer: 'Singer 1' });
    getAllSongs: () => Song[] = () => this.allSongs;
    clearSongs: () => void = () => this.allSongs = [];
    addSong: (data: { singer: string, id: string }) => Song = ({ singer, id }) => { 
	const s: Song = { singer, id };
	this.allSongs.push(s);
	return s; 
    };
    allMovies: Movie[] = []
    getMovie: () => Movie = () => ({ director: 'Stephen Spielberg', id: '1' });
    getAllMovies: () => Movie[] = () => this.allMovies;
    addMovie: (data: { director: string, id: string }) => Movie = ({ director, id }) => { 
	const m: Movie = { director, id };
	this.allMovies.push(m);
	return m; 
    };
    clearMovies: () => void = () => this.allMovies = [];
}

const ds: DataStoreProps = new DataStore();
