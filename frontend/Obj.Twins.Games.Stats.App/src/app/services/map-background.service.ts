import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapBackgroundService {

  public getBackgroundUrl(mapName: string): string {
    switch (mapName) {
      case 'aim_map':
      case 'workshop/624412268/aim_map_noawp':
        return '../../assets/maps/aim_map.jpg';
      case 'ar_baggage':
        return '../../assets/maps/ar_baggage.jpg';
      case 'ar_dizzy':
        return '../../assets/maps/ar_dizzy.jpg';
      case 'ar_lunacy':
        return '../../assets/maps/ar_lunacy.jpg';
      case 'ar_monastery':
        return '../../assets/maps/ar_monastery.jpg';
      case 'ar_shoots':
        return '../../assets/maps/ar_shoots.jpg';
      case 'awp_india':
      case 'workshop/391889933/awp_india_csgo':
        return '../../assets/maps/awp_india.jpg';
      case 'coop_kasbash':
        return '../../assets/maps/coop_kasbash.jpg';
      case 'cs_agency':
        return '../../assets/maps/cs_agency.jpg';
      case 'cs_assault':
        return '../../assets/maps/cs_assault.jpg';
      case 'cs_italy':
        return '../../assets/maps/cs_italy.jpg';
      case 'cs_militia':
        return '../../assets/maps/cs_militia.jpg';
      case 'cs_office':
        return '../../assets/maps/cs_office.jpg';
      case 'de_anubis':
        return '../../assets/maps/de_anubis.jpg';
      case 'de_bank':
        return '../../assets/maps/de_bank.jpg';
      case 'de_cache':
        return '../../assets/maps/de_cache.jpg';
      case 'de_canals':
        return '../../assets/maps/de_canals.jpg';
      case 'de_cbble':
      case 'gd_cbble':
        return '../../assets/maps/de_cbble.jpg';
      case 'de_chlorine':
        return '../../assets/maps/de_chlorine.jpg';
      case 'de_dust2':
        return '../../assets/maps/de_dust2.jpg';
      case 'de_inferno':
        return '../../assets/maps/de_inferno.jpg';
      case 'de_lake':
        return '../../assets/maps/de_lake.jpg';
      case 'de_mirage':
        return '../../assets/maps/de_mirage.jpg';
      case 'de_nuke':
        return '../../assets/maps/de_nuke.jpg';
      case 'de_overpass':
        return '../../assets/maps/de_overpass.jpg';
      case 'de_safehouse':
        return '../../assets/maps/de_safehouse.jpg';
      case 'de_shortdust':
        return '../../assets/maps/de_shortdust.png';
      case 'de_shortnuke':
        return '../../assets/maps/de_shortnuke.jpg';
      case 'de_stmarc':
        return '../../assets/maps/de_stmarc.jpg';
      case 'de_sugarcrane':
        return '../../assets/maps/de_sugarcrane.jpg';
      case 'de_train':
        return '../../assets/maps/de_train.jpg';
      case 'de_vertigo':
        return '../../assets/maps/de_vertigo.jpg';
      case 'gd_rialto':
        return '../../assets/maps/gd_rialto.jpg';
      default:
        return '../../assets/maps/default.jpg';
    }
  }

}
