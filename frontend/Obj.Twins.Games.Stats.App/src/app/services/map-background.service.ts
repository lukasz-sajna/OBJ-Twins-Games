import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapBackgroundService {

  public getBackgroundUrl(mapName: string): string {
    switch (mapName) {
      case 'de_vertigo':
        return '../../assets/de_vertigo.jpg';
      case 'de_inferno':
        return '../../assets/de_inferno.jpg';
      case 'de_cbble':
        return '../../assets/de_cbble.jpg';
      case 'de_train':
        return '../../assets/de_train.jpg';
      case 'de_shortnuke':
        return '../../assets/de_shortnuke.jpg';
      case 'de_shortdust':
        return '../../assets/de_shortdust.png';
      case 'gd_rialto':
        return '../../assets/gd_rialto.jpg';
      case 'de_lake':
        return '../../assets/de_lake.jpg';
      case 'de_mirage':
        return '../../assets/de_mirage.jpg';
      case 'de_dust2':
        return '../../assets/de_dust2.jpg';
      case 'de_nuke':
        return '../../assets/de_nuke.jpg';
      case 'de_cache':
        return '../../assets/de_cache.jpg';
      case 'aim_map':
        return '../../assets/aim_map.jpg';
      case 'awp_india':
        return '../../assets/awp_india.jpg';
      case 'de_overpass':
        return '../../assets/de_overpass.jpg';
      default:
        return '../../assets/default.jpg';
    }
  }

}
