
WeatherUtil.CLOUDS_CLEAR = "clear";
WeatherUtil.CLOUDS_FAIR = "fair";
WeatherUtil.CLOUDS_PARTLY_CLOUDY = "partlyCloudy";
WeatherUtil.CLOUDS_MOSTLY_CLOUDY = "mostlyCloudy";
WeatherUtil.CLOUDS_OVERCAST = "overcast";

WeatherUtil.DEFAULT_MOSTLY_CLOUDY_VISIBILITY_M = 4500;
WeatherUtil.DEFAULT_OVERCAST_VISIBILITY_M = 10 * 1000; //o "unlimited";

WeatherUtil.PRECIP_NO = 'no';
WeatherUtil.PRECIP_RAIN = 'rain';
WeatherUtil.PRECIP_SNOW = 'snow';
WeatherUtil.PRECIP_HAIL = 'hail';

WeatherUtil.INTENSITY_UNKNOWN = 'unknown';
WeatherUtil.INTENSITY_LIGHT = 'light';
WeatherUtil.INTENSITY_REGULAR = 'regular';
WeatherUtil.INTENSITY_HEAVY = 'heavy';

WeatherUtil.MIST_DUST = "dust";
WeatherUtil.MIST_FOG = "fog";
WeatherUtil.MIST_HAZE = "haze";
WeatherUtil.MIST_SMOKE = "smoke";
WeatherUtil.VISIBILITY_UNLIMITED = "unlimited";

WeatherUtil.SOURCE_WEATHER_STATION = "weatherStation";
WeatherUtil.NO_TRANSLATE = "no_translate";

function WeatherUtil() {
}

/*<sky>
      <description value="Clear Night"/>
      <clouds value="clear"/>
      <precipitation>
        <rain>	  
          <rate value="0"/>
          <daily_total value="0.0"/>	
        </rain>
 <snow>
 <rate value="0" unit="mmph"/>
 <level value="2.5" unit="cm"/>
 </snow>
      </precipitation>
      <thunderstorm value="0"/>
    </sky>	
*/

WeatherUtil.findSkyImageId = function(weather, isNight) {
	
	var sky = WeatherUtil.getSkyObjectForWeatherNode(weather);

    var clouds     = sky.clouds.value;
    var precipMode = sky.precipitation.mode;
    var mistType   = sky.mist != undefined ? sky.mist.type : null;
	
    var isThunderstorm = sky.thunderstorm != undefined;
	
    if (mistType) {
        return mistType;
    }
    if (isThunderstorm) {
	return "thunderstorm";
    }
	
    if (!sky.precipitation || precipMode == "no") {
        if (clouds == WeatherUtil.CLOUDS_CLEAR) {
            if (isNight) {
                return clouds + "_night";
            }
            return clouds;
        }
        else if (clouds == WeatherUtil.CLOUDS_FAIR ||
		 clouds == WeatherUtil.CLOUDS_PARTLY_CLOUDY) {
            if (isNight) {
                return "partlyCloudy_night";
            }
            return "partlyCloudy";
        }
        else if (clouds == WeatherUtil.CLOUDS_MOSTLY_CLOUDY) {
            
            return "mostlyCloudy";
        }
        else if (clouds == WeatherUtil.CLOUDS_OVERCAST) {
            return "cloudy";
        }
        return "unsupported";
    }
        
    var intensity = sky.precipitation.intensity;
    if (precipMode == "rain") {
        if (intensity == WeatherUtil.INTENSITY_LIGHT) {
            return "lightRain";
        }
        else if (intensity == WeatherUtil.INTENSITY_REGULAR ||
		 intensity == WeatherUtil.INTENSITY_UNKNOWN) {
            return "rain";
        }
        else if (intensity == WeatherUtil.INTENSITY_HEAVY) {
            return "heavyRain";
        }
	if (!intensity) {
	    //D.p("SkyBitmapPicker, rain intensity missing");
	}
        return "unsupported";
    }
    else if (precipMode == "snow") {
        if (intensity == WeatherUtil.INTENSITY_LIGHT) {
            return "lightSnow";
        }
        else if (intensity == WeatherUtil.INTENSITY_REGULAR ||
		 intensity == WeatherUtil.INTENSITY_UNKNOWN) {
            return "snow";
        }
        else if (intensity == WeatherUtil.INTENSITY_HEAVY) {
            return "heavySnow";
        }
	if (!intensity) {
	    //D.p("SkyBitmapPicker, rain intensity missing");
	}
        return "unsupported";
    }
		
    //D.severe("precipMode missing");
    return "unsupported";
}

WeatherUtil.getSkyObjectForWeatherNode = function(node) {
    var sky = {};
    if (node.getElementsByTagName("sky")[0].getElementsByTagName("clouds")[0]) {
    	sky.clouds = {};
    	sky.clouds.value = node
    	.getElementsByTagName("sky")[0]
    	.getElementsByTagName("clouds")[0]
    	.getAttribute("value");
    }

    if (node.getElementsByTagName("sky")[0].getElementsByTagName("mist")[0]) {
    	sky.mist = {};
    	sky.mist.type = node
		.getElementsByTagName("sky")[0]
	    .getElementsByTagName("mist")[0]
		.getAttribute("type")
    }

    if (node.getElementsByTagName("sky")[0].getElementsByTagName("thunder")[0]) {
		sky.thunderstorm = true;
    }

    if (node.getElementsByTagName("sky")[0].getElementsByTagName("precipitation")[0]) {
		sky.precipitation = {};
		sky.precipitation.mode = 
		node
		.getElementsByTagName("sky")[0]
		.getElementsByTagName("precipitation")[0]
		.getAttribute("mode") 
		?
			node
			.getElementsByTagName("sky")[0]
			.getElementsByTagName("precipitation")[0]
			.getAttribute("mode") 
			:"no";
	
		sky.precipitation.intensity = 
		node
	    .getElementsByTagName("sky")[0]
		.getElementsByTagName("precipitation")[0]
		.getAttribute("intensity") 
		?
			node
			.getElementsByTagName("sky")[0]
			.getElementsByTagName("precipitation")[0]
			.getAttribute("intensity") 
			:"unknown";
    }
    return sky;
}

WeatherUtil.formatTemperature = function(temperatureUnit, value) {
    if (temperatureUnit == "fahrenheit"
	|| temperatureUnit == "f") {
        return Math.round(1.8 * value + 32) + "";
    }
    return value + "";
}
