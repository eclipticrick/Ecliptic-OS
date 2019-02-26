import {User} from "./user";

export enum FileSystemDiscriminator {
    FILE = 'FILE',
    FOLDER = 'FOLDER'
}
export enum EclipticFilePermission {
    READ = 'R',
    WRITE = 'W',
    EXECUTE = 'X',
}
export enum EclipticFilePermissionGroup {
    sudo = 'SUDO',
    user = 'USER',
    guest = 'GUEST'
}


export interface EclipticFile {
    discriminator: FileSystemDiscriminator.FILE
    name: string
    owner: User
    createdAt: Date
    lastModifiedAt?: Date
    locked?: boolean
    permissions: {
        u: EclipticFilePermission[],
        g: EclipticFilePermission[],
        a: EclipticFilePermission[],
    }
    content?: any
    contentHistory: any[]
    hidden?: boolean
}
export const defaultFile = {
    discriminator: FileSystemDiscriminator.FILE,
    contentHistory: [],
    createdAt: new Date(),
    permissions: {
        u: [EclipticFilePermission.READ, EclipticFilePermission.WRITE, EclipticFilePermission.EXECUTE],
        g: [EclipticFilePermission.READ],
        a: [EclipticFilePermission.READ]
    },
    name: null,
    owner: null
} as EclipticFile;


export interface Folder {
    discriminator: FileSystemDiscriminator.FOLDER
    name: string
    customIcon?: string
    content: (Folder | EclipticFile)[]
    protected?: boolean
}
export const defaultFolder = {
    discriminator: FileSystemDiscriminator.FOLDER,
    content: [],
    name: null
} as Folder;
