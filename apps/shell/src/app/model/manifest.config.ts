import { Manifest, RemoteConfig } from '@angular-architects/module-federation';

export type NOCRemoteConfig = RemoteConfig & {
  exposedModule: string;
  displayName: string;
  routePath: string;
  iconName: string;
};

export type NOCManifest = Manifest<NOCRemoteConfig>;
