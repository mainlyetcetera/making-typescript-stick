export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}
// export interface Flag extends DataEntity {
//   pattern: string;
// }

export type DataEntityMap = {
  movie: Movie;
  song: Song;
  // flag: Flag;
};

    /*
     * I inherently made these more generic, but this isn't really necessary
     * unless my plan is to use these types with other objects past this data store
     * i.e., it is perfectly valid to have: 

     type Lists = {
         [K in keyof DataEntityMap as `all${Capitalize<string & K>}s`]: DataEntityMap[K][]
     };

     * the benefit of this is that we avoid an unnecessary generic
     * which adds complexity; complexity should only be added if it adds some benefit
     * and it wouldn't in this case, as the flexibility is unneeded
    */

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

    /*
     * Mike's solution has all of the types put together in their raw forms combined with `&`
     * what I like about that is that you avoid needing to name each one
     * particularly since the use of generics isn't necessary; they're not going to be re-used, at least at this stage
     *
     * what I don't like about that is that, unless one is also clear on how to piece together what these types do,
     * it becomes confusing what these types are, what benefit you're getting from having them,
     * or how to eventually add to them should a new use-case come along
     * "change add to set"
     * the names make it that much more clear where to go to implement that change
     * let alone adding something more complex to this
     */

type DataStoreProps = Lists<DataEntityMap> & SingleGetters<DataEntityMap> & MultiGetters<DataEntityMap> & Adders<DataEntityMap> & Clearers<DataEntityMap>;

export class DataStore implements DataStoreProps {

    /*
     * his actual implementation is much more clean than mine,
     * as he's more familiar with how data stores are supposed to look
     * also, he's avoiding unnecessary destructuring,
     * where my habit is to do it always period
     *
     * that being said, the only thing he's typing is the methods
     * where there may be benefit to having strong typing around the contents of the store
     * though I guess that's all implemented in each interface above
     *
     * a general note, his methods looked like:
     * getAllSongs() {
     * ...implementation
     * }
     * and he didn't have to always double up on the type signatures
     *
     * also, side note: don't forget about this type check
     *
     * function isDefined<T>(x: T | undefined): x is T {
     *     return typeof x !== 'undefined';
     * }
     *
     * lets you, with a function, implement the type guard
     *
     * and something else that's strange to me:
     * his getAllSongs ended with:
     * mappedArray.filter(isDefined)
     *
     * I guess that, really, this is just naming the cb fn for filter instead of writing it literally
     * is the only real difference here
     * yeah, this isn't that strange
     * I just almost never see someone define the cb fn for one of the iterators
     * so it looked very odd to me
     *
     * final note: don't forget about #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> }
     * I was trying to use the private keyword, and could not
     * so the #data is the way to implement that private functionality for now
    */

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
