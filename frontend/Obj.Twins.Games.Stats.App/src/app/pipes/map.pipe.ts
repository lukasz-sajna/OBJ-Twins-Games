import { Pipe, PipeTransform, ɵConsole } from '@angular/core';
import { Console } from 'console';

@Pipe({
  name: 'map'
})
export class MapPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'aim_map':
      case 'workshop/624412268/aim_map_noawp':
        return 'Aim Map';
      case 'ar_baggage':
        return 'Baggage';
      case 'ar_dizzy':
        return 'Dizzy';
      case 'ar_lunacy':
        return 'Lunacy';
      case 'ar_monastery':
        return 'Monastery';
      case 'ar_shoots':
        return 'Shoots';
      case 'awp_india':
      case 'workshop/391889933/awp_india_csgo':
        return 'AWP India';
      case 'coop_kasbash':
        return 'Kasbash';
      case 'cs_agency':
        return 'Agency';
      case 'cs_assault':
        return 'Assault';
      case 'cs_italy':
        return 'Italy';
      case 'cs_militia':
        return 'Militia';
      case 'cs_office':
        return 'Office';
      case 'de_anubis':
        return 'Anubis';
      case 'de_bank':
        return 'Bank';
      case 'de_cache':
        return 'Cache';
      case 'de_canals':
        return 'Canals';
      case 'de_cbble':
      case 'gd_cbble':
        return 'Cobblestone';
      case 'de_chlorine':
        return 'Cholrine';
      case 'de_dust2':
        return 'Dust2';
      case 'de_inferno':
        return 'Inferno';
      case 'de_lake':
        return 'Lake';
      case 'de_mirage':
        return 'Mirage';
      case 'de_nuke':
        return 'Nuke';
      case 'de_overpass':
        return 'Overpass';
      case 'de_safehouse':
        return 'Safehouse';
      case 'de_shortdust':
        return 'Short Dust';
      case 'de_shortnuke':
        return 'Short Nuke';
      case 'de_stmarc':
        return 'St. Marc';
      case 'de_sugarcrane':
        return 'Sugarcrane';
      case 'de_train':
        return 'Train';
      case 'de_vertigo':
        return 'Vertigo';
      case 'gd_rialto':
        return 'Rialto';
      default:
        return this.transformCustomMap(value);
    }
  }

  private transformCustomMap(mapName: string): string {
    if (mapName) {
      const transformedMapName = mapName.match('[^\/]*$');
      return transformedMapName.map(x => x)[0];
    }
    return mapName;
  }

}
