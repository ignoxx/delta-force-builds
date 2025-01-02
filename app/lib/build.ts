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

export const weaponTypes = ["AR", "SMG", "Shotgun", "LMG", "MR", "SR", "Pistol"] as const
export type WeaponType = typeof weaponTypes[number]
export type ServerType = "global" | "garena/china"
