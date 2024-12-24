export interface Build {
  id: string,
  author: string,
  code: string,
  collectionId: string,
  collectionName: string,
  created: string,
  description: string,
  image: [string],
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

export type WeaponType = "AR" | "SMG" | "Shotgun" | "LMG" | "MR" | "SR" | "Pistol"
