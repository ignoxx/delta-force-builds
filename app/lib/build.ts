export interface Build {
  id: string,
  author: string,
  code: string,
  collectionId: string,
  collectionName: string,
  created: string,
  description: string,
  discordName: string,
  image: [string],
  likes: number,
  copies: number,
  title: string,
  type: string,
  updated: string,
  weapon: string,
  expand?: {
    type: Type
  }
}

export interface Type {
  id: string
  name: string
}
