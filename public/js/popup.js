// Generated by CoffeeScript 1.6.3
(function() {
  define(["jquery", "d3", "utils", "pubsub", "common"], function($, d3, utils, PubSub, common) {
    var current_year, last_mouse_x, mouseenter, mouseleave, move_circles, popup, popup_position, popup_width, svg;
    move_circles = function(sel) {
      return sel.attr("transform", function(prenom_data) {
        var x_pos, y_pos;
        x_pos = utils.axis.x(current_year);
        y_pos = utils.axis.y(prenom_data.years[current_year - utils.years[0]]);
        return "translate(" + x_pos + " " + y_pos + ")";
      });
    };
    PubSub.subscribe("prenom:remove", function() {
      if (utils.prenoms_selection.length <= 1) {
        return popup.transition().attr("opacity", 0);
      }
    });
    PubSub.subscribe("axis:y:update", function() {
      return svg.select("#circles").selectAll(".circle").transition().duration(utils.duration).call(move_circles);
    });
    popup_width = 300;
    svg = d3.select("svg");
    popup = svg.select("#popup").attr("opacity", 0);
    popup.append("rect").attr("class", "bg").attr("width", popup_width).attr("height", 150);
    popup.append("text").attr("class", "year").attr("x", 10).attr("y", 27);
    mouseenter = function() {
      if (utils.prenoms_selection.length) {
        popup.transition().attr("opacity", 1);
        return svg.selectAll("#circles .circle").transition().attr("opacity", 1);
      }
    };
    mouseleave = function() {
      popup.transition().attr("opacity", 0);
      return svg.selectAll("#circles .circle").transition().attr("opacity", 0);
    };
    popup_position = null;
    last_mouse_x = -1;
    current_year = utils.years[0];
    svg.on("mouseenter", mouseenter).on("mouseleave", mouseleave).on("mousemove", function() {
      var change_pos, mouse_x, mouse_y, prenom_summaries, x_translations, _ref;
      _ref = d3.mouse(this), mouse_x = _ref[0], mouse_y = _ref[1];
      if (mouse_y > utils.axis.y.range()[0]) {
        mouseleave();
        return;
      }
      mouseenter();
      current_year = parseInt(utils.axis.x.invert(mouse_x));
      current_year = common.constrain(current_year, utils.axis.x.domain()[0], utils.axis.x.domain()[1]);
        
        console.debug(current_year+" "+utils.axis.x.domain()[0]+" "+utils.axis.x.domain()[1]);
      popup.select(".year").text(function(d) {

          tmpLabel = "";
          switch (current_year) {



              case 1950:tmpLabel = 'Genesis / Surah 1';
                  break;
              case 1951:tmpLabel = 'Genesis / Surah 1';
                  break;
              case 1952:tmpLabel = 'Genesis / Surah 2';
                  break;
              case 1953:tmpLabel = 'Genesis / Surah 2';
                  break;

              case 1954:tmpLabel = 'Exodus / Surah 3';
                  break;
              case 1955:tmpLabel = 'Exodus / Surah 3';
                  break;
              case 1956:tmpLabel = 'Exodus / Surah 4';
                  break;
              case 1957:tmpLabel = 'Exodus / Surah 4';
                  break;

              case 1958:tmpLabel = 'Leviticus / Surah 5';
                  break;
              case 1959:tmpLabel = 'Leviticus / Surah 5';
                  break;
              case 1960:tmpLabel = 'Leviticus / Surah 6';
                  break;
              case 1961:tmpLabel = 'Leviticus / Surah 6';
                  break;

              case 1962:tmpLabel = 'Numbers / Surah 7';
                  break;
              case 1963:tmpLabel = 'Numbers / Surah 7';
                  break;
              case 1964:tmpLabel = 'Numbers / Surah 8';
                  break;
              case 1965:tmpLabel = 'Numbers / Surah 8';
                  break;

              case 1966:tmpLabel = 'Deuteronomy / Surah 9';
                  break;
              case 1967:tmpLabel = 'Deuteronomy / Surah 9';
                  break;
              case 1968:tmpLabel = 'Deuteronomy / Surah 10';
                  break;
              case 1969:tmpLabel = 'Deuteronomy / Surah 10';
                  break;

              case 1970:tmpLabel = 'Joshua / Surah 11';
                  break;
              case 1971:tmpLabel = 'Joshua / Surah 11';
                  break;
              case 1972:tmpLabel = 'Joshua / Surah 12';
                  break;
              case 1973:tmpLabel = 'Joshua / Surah 12';
                  break;

              case 1974:tmpLabel = 'Judges / Surah 13';
                  break;
              case 1975:tmpLabel = 'Judges / Surah 13';
                  break;
              case 1976:tmpLabel = 'Judges / Surah 14';
                  break;
              case 1977:tmpLabel = 'Judges / Surah 14';
                  break;

              case 1978:tmpLabel = 'Ruth / Surah 15';
                  break;
              case 1979:tmpLabel = 'Ruth / Surah 15';
                  break;
              case 1980:tmpLabel = 'Ruth / Surah 16';
                  break;
              case 1981:tmpLabel = 'Ruth / Surah 16';
                  break;

              case 1982:tmpLabel = '1 Samuel / Surah 17';
                  break;
              case 1983:tmpLabel = '1 Samuel / Surah 17';
                  break;
              case 1984:tmpLabel = '1 Samuel / Surah 18';
                  break;
              case 1985:tmpLabel = '1 Samuel / Surah 18';
                  break;

              case 1986:tmpLabel = '2 Samuel / Surah 19';
                  break;
              case 1987:tmpLabel = '2 Samuel / Surah 19';
                  break;
              case 1988:tmpLabel = '2 Samuel / Surah 20';
                  break;
              case 1989:tmpLabel = '2 Samuel / Surah 20';
                  break;

              case 1990:tmpLabel = '1 Kings / Surah 21';
                  break;
              case 1991:tmpLabel = '1 Kings / Surah 21';
                  break;
              case 1992:tmpLabel = '1 Kings / Surah 22';
                  break;
              case 1993:tmpLabel = '1 Kings / Surah 22';
                  break;

              case 1994:tmpLabel = '2 Kings / Surah 23';
                  break;
              case 1995:tmpLabel = '2 Kings / Surah 23';
                  break;
              case 1996:tmpLabel = '2 Kings / Surah 24';
                  break;
              case 1997:tmpLabel = '2 Kings / Surah 24';
                  break;

              case 1998:tmpLabel = '1 Chronicles / Surah 25';
                  break;
              case 1999:tmpLabel = '1 Chronicles / Surah 25';
                  break;
              case 2000:tmpLabel = '1 Chronicles / Surah 26';
                  break;
              case 2001:tmpLabel = '1 Chronicles / Surah 26';
                  break;

              case 2002:tmpLabel = '2 Chronicles / Surah 27';
                  break;
              case 2003:tmpLabel = '2 Chronicles / Surah 27';
                  break;
              case 2004:tmpLabel = '2 Chronicles / Surah 28';
                  break;
              case 2005:tmpLabel = '2 Chronicles / Surah 28';
                  break;

              case 2006:tmpLabel = 'Ezra / Surah 29';
                  break;
              case 2007:tmpLabel = 'Ezra / Surah 29';
                  break;
              case 2008:tmpLabel = 'Ezra / Surah 30';
                  break;
              case 2009:tmpLabel = 'Ezra / Surah 30';
                  break;

              case 2010:tmpLabel = 'Nehemiah / Surah 31';
                  break;
              case 2011:tmpLabel = 'Nehemiah / Surah 31';
                  break;
              case 2012:tmpLabel = 'Nehemiah / Surah 32';
                  break;
              case 2013:tmpLabel = 'Nehemiah / Surah 32';
                  break;

              case 2014:tmpLabel = 'Esther / Surah 33';
                  break;
              case 2015:tmpLabel = 'Esther / Surah 33';
                  break;
              case 2016:tmpLabel = 'Esther / Surah 34';
                  break;
              case 2017:tmpLabel = 'Esther / Surah 34';
                  break;

              case 2018:tmpLabel = 'Job / Surah 35';
                  break;
              case 2019:tmpLabel = 'Job / Surah 35';
                  break;
              case 2020:tmpLabel = 'Job / Surah 36';
                  break;
              case 2021:tmpLabel = 'Job / Surah 36';
                  break;

              case 2022:tmpLabel = 'Psalms / Surah 37';
                  break;
              case 2023:tmpLabel = 'Psalms / Surah 37';
                  break;
              case 2024:tmpLabel = 'Psalms / Surah 38';
                  break;
              case 2025:tmpLabel = 'Psalms / Surah 38';
                  break;

              case 2026:tmpLabel = 'Proverbs / Surah 39';
                  break;
              case 2027:tmpLabel = 'Proverbs / Surah 39';
                  break;
              case 2028:tmpLabel = 'Proverbs / Surah 40';
                  break;
              case 2029:tmpLabel = 'Proverbs / Surah 40';
                  break;

              case 2030:tmpLabel = 'Ecclesiastes / Surah 41';
                  break;
              case 2031:tmpLabel = 'Ecclesiastes / Surah 41';
                  break;
              case 2032:tmpLabel = 'Ecclesiastes / Surah 42';
                  break;
              case 2033:tmpLabel = 'Ecclesiastes / Surah 42';
                  break;

              case 2034:tmpLabel = 'Song of Songs / Surah 43';
                  break;
              case 2035:tmpLabel = 'Song of Songs / Surah 43';
                  break;
              case 2036:tmpLabel = 'Song of Songs / Surah 44';
                  break;
              case 2037:tmpLabel = 'Song of Songs / Surah 44';
                  break;

              case 2038:tmpLabel = 'Isaiah / Surah 45';
                  break;
              case 2039:tmpLabel = 'Isaiah / Surah 45';
                  break;
              case 2040:tmpLabel = 'Isaiah / Surah 46';
                  break;
              case 2041:tmpLabel = 'Isaiah / Surah 46';
                  break;

              case 2042:tmpLabel = 'Jeremiah / Surah 47';
                  break;
              case 2043:tmpLabel = 'Jeremiah / Surah 47';
                  break;
              case 2044:tmpLabel = 'Jeremiah / Surah 48';
                  break;
              case 2045:tmpLabel = 'Jeremiah / Surah 48';
                  break;

              case 2046:tmpLabel = 'Lamentations / Surah 49';
                  break;
              case 2047:tmpLabel = 'Lamentations / Surah 49';
                  break;
              case 2048:tmpLabel = 'Lamentations / Surah 50';
                  break;
              case 2049:tmpLabel = 'Lamentations / Surah 50';
                  break;

              case 2050:tmpLabel = 'Ezekiel / Surah 51';
                  break;
              case 2051:tmpLabel = 'Ezekiel / Surah 51';
                  break;
              case 2052:tmpLabel = 'Ezekiel / Surah 52';
                  break;
              case 2053:tmpLabel = 'Ezekiel / Surah 52';
                  break;

              case 2054:tmpLabel = 'Daniel / Surah 53';
                  break;
              case 2055:tmpLabel = 'Daniel / Surah 53';
                  break;
              case 2056:tmpLabel = 'Daniel / Surah 54';
                  break;
              case 2057:tmpLabel = 'Daniel / Surah 54';
                  break;

              case 2058:tmpLabel = 'Hosea / Surah 55';
                  break;
              case 2059:tmpLabel = 'Hosea / Surah 55';
                  break;
              case 2060:tmpLabel = 'Hosea / Surah 56';
                  break;
              case 2061:tmpLabel = 'Hosea / Surah 56';
                  break;

              case 2062:tmpLabel = 'Joel / Surah 57';
                  break;
              case 2063:tmpLabel = 'Joel / Surah 57';
                  break;
              case 2064:tmpLabel = 'Joel / Surah 58';
                  break;
              case 2065:tmpLabel = 'Joel / Surah 58';
                  break;

              case 2066:tmpLabel = 'Amos / Surah 59';
                  break;
              case 2067:tmpLabel = 'Amos / Surah 59';
                  break;
              case 2068:tmpLabel = 'Amos / Surah 60';
                  break;
              case 2069:tmpLabel = 'Amos / Surah 60';
                  break;

              case 2070:tmpLabel = 'Obadiah / Surah 61';
                  break;
              case 2071:tmpLabel = 'Obadiah / Surah 61';
                  break;
              case 2072:tmpLabel = 'Obadiah / Surah 62';
                  break;
              case 2073:tmpLabel = 'Obadiah / Surah 62';
                  break;

              case 2074:tmpLabel = 'Jonah / Surah 63';
                  break;
              case 2075:tmpLabel = 'Jonah / Surah 63';
                  break;
              case 2076:tmpLabel = 'Jonah / Surah 64';
                  break;
              case 2077:tmpLabel = 'Jonah / Surah 64';
                  break;

              case 2078:tmpLabel = 'Micah / Surah 65';
                  break;
              case 2079:tmpLabel = 'Micah / Surah 65';
                  break;
              case 2080:tmpLabel = 'Micah / Surah 66';
                  break;
              case 2081:tmpLabel = 'Micah / Surah 66';
                  break;

              case 2082:tmpLabel = 'Nahum / Surah 67';
                  break;
              case 2083:tmpLabel = 'Nahum / Surah 67';
                  break;
              case 2084:tmpLabel = 'Nahum / Surah 68';
                  break;
              case 2085:tmpLabel = 'Nahum / Surah 68';
                  break;

              case 2086:tmpLabel = 'Habakkuk / Surah 69';
                  break;
              case 2087:tmpLabel = 'Habakkuk / Surah 69';
                  break;
              case 2088:tmpLabel = 'Habakkuk / Surah 70';
                  break;
              case 2089:tmpLabel = 'Habakkuk / Surah 70';
                  break;

              case 2090:tmpLabel = 'Zephaniah / Surah 71';
                  break;
              case 2091:tmpLabel = 'Zephaniah / Surah 71';
                  break;
              case 2092:tmpLabel = 'Zephaniah / Surah 72';
                  break;
              case 2093:tmpLabel = 'Zephaniah / Surah 72';
                  break;

              case 2094:tmpLabel = 'Haggai / Surah 73';
                  break;
              case 2095:tmpLabel = 'Haggai / Surah 73';
                  break;
              case 2096:tmpLabel = 'Haggai / Surah 74';
                  break;
              case 2097:tmpLabel = 'Haggai / Surah 74';
                  break;

              case 2098:tmpLabel = 'Zechariah / Surah 75';
                  break;
              case 2099:tmpLabel = 'Zechariah / Surah 75';
                  break;
              case 2100:tmpLabel = 'Zechariah / Surah 76';
                  break;
              case 2101:tmpLabel = 'Zechariah / Surah 76';
                  break;

              case 2102:tmpLabel = 'Malachi / Surah 77';
                  break;
              case 2103:tmpLabel = 'Malachi / Surah 77';
                  break;
              case 2104:tmpLabel = 'Malachi / Surah 78';
                  break;
              case 2105:tmpLabel = 'Malachi / Surah 78';
                  break;

              case 2106:tmpLabel = 'Matthew / Surah 79';
                  break;
              case 2107:tmpLabel = 'Matthew / Surah 79';
                  break;
              case 2108:tmpLabel = 'Matthew / Surah 80';
                  break;
              case 2109:tmpLabel = 'Matthew / Surah 80';
                  break;

              case 2110:tmpLabel = 'Mark / Surah 81';
                  break;
              case 2111:tmpLabel = 'Mark / Surah 81';
                  break;
              case 2112:tmpLabel = 'Mark / Surah 82';
                  break;
              case 2113:tmpLabel = 'Mark / Surah 82';
                  break;

              case 2114:tmpLabel = 'Luke / Surah 83';
                  break;
              case 2115:tmpLabel = 'Luke / Surah 83';
                  break;
              case 2116:tmpLabel = 'Luke / Surah 84';
                  break;
              case 2117:tmpLabel = 'Luke / Surah 84';
                  break;

              case 2118:tmpLabel = 'John / Surah 85';
                  break;
              case 2119:tmpLabel = 'John / Surah 85';
                  break;
              case 2120:tmpLabel = 'John / Surah 86';
                  break;
              case 2121:tmpLabel = 'John / Surah 86';
                  break;

              case 2122:tmpLabel = 'Acts / Surah 87';
                  break;
              case 2123:tmpLabel = 'Acts / Surah 87';
                  break;
              case 2124:tmpLabel = 'Acts / Surah 88';
                  break;
              case 2125:tmpLabel = 'Acts / Surah 88';
                  break;

              case 2126:tmpLabel = 'Romans / Surah 89';
                  break;
              case 2127:tmpLabel = 'Romans / Surah 89';
                  break;
              case 2128:tmpLabel = 'Romans / Surah 90';
                  break;
              case 2129:tmpLabel = 'Romans / Surah 90';
                  break;

              case 2130:tmpLabel = '1 Corinthians / Surah 91';
                  break;
              case 2131:tmpLabel = '1 Corinthians / Surah 91';
                  break;
              case 2132:tmpLabel = '1 Corinthians / Surah 92';
                  break;
              case 2133:tmpLabel = '1 Corinthians / Surah 92';
                  break;

              case 2134:tmpLabel = '2 Corinthians / Surah 93';
                  break;
              case 2135:tmpLabel = '2 Corinthians / Surah 93';
                  break;
              case 2136:tmpLabel = '2 Corinthians / Surah 94';
                  break;
              case 2137:tmpLabel = '2 Corinthians / Surah 94';
                  break;

              case 2138:tmpLabel = 'Galatians / Surah 95';
                  break;
              case 2139:tmpLabel = 'Galatians / Surah 95';
                  break;
              case 2140:tmpLabel = 'Galatians / Surah 96';
                  break;
              case 2141:tmpLabel = 'Galatians / Surah 96';
                  break;

              case 2142:tmpLabel = 'Ephesians / Surah 97';
                  break;
              case 2143:tmpLabel = 'Ephesians / Surah 97';
                  break;
              case 2144:tmpLabel = 'Ephesians / Surah 98';
                  break;
              case 2145:tmpLabel = 'Ephesians / Surah 98';
                  break;

              case 2146:tmpLabel = 'Philippians / Surah 99';
                  break;
              case 2147:tmpLabel = 'Philippians / Surah 99';
                  break;
              case 2148:tmpLabel = 'Philippians / Surah 100';
                  break;
              case 2149:tmpLabel = 'Philippians / Surah 100';
                  break;

              case 2150:tmpLabel = 'Colossians / Surah 101';
                  break;
              case 2151:tmpLabel = 'Colossians / Surah 101';
                  break;
              case 2152:tmpLabel = 'Colossians / Surah 102';
                  break;
              case 2153:tmpLabel = 'Colossians / Surah 102';
                  break;

              case 2154:tmpLabel = '1 Thessalonians / Surah 103';
                  break;
              case 2155:tmpLabel = '1 Thessalonians / Surah 103';
                  break;
              case 2156:tmpLabel = '1 Thessalonians / Surah 104';
                  break;
              case 2157:tmpLabel = '1 Thessalonians / Surah 104';
                  break;

              case 2158:tmpLabel = '2 Thessalonians / Surah 105';
                  break;
              case 2159:tmpLabel = '2 Thessalonians / Surah 105';
                  break;
              case 2160:tmpLabel = '2 Thessalonians / Surah 106';
                  break;
              case 2161:tmpLabel = '2 Thessalonians / Surah 106';
                  break;

              case 2162:tmpLabel = '1 Timothy / Surah 107';
                  break;
              case 2163:tmpLabel = '1 Timothy / Surah 107';
                  break;
              case 2164:tmpLabel = '1 Timothy / Surah 108';
                  break;
              case 2165:tmpLabel = '1 Timothy / Surah 108';
                  break;

              case 2166:tmpLabel = '2 Timothy / Surah 109';
                  break;
              case 2167:tmpLabel = '2 Timothy / Surah 109';
                  break;
              case 2168:tmpLabel = '2 Timothy / Surah 110';
                  break;
              case 2169:tmpLabel = '2 Timothy / Surah 110';
                  break;

              case 2170:tmpLabel = 'Titus / Surah 111';
                  break;
              case 2171:tmpLabel = 'Titus / Surah 111';
                  break;
              case 2172:tmpLabel = 'Titus / Surah 112';
                  break;
              case 2173:tmpLabel = 'Titus / Surah 112';
                  break;

              case 2174:tmpLabel = 'Philemon / Surah 113';
                  break;
              case 2175:tmpLabel = 'Philemon / Surah 113';
                  break;
              case 2176:tmpLabel = 'Philemon / Surah 114';
                  break;
              case 2177:tmpLabel = 'Philemon / Surah 114';
                  break;

              case 2178:tmpLabel = 'Hebrews';
                  break;
              case 2179:tmpLabel = 'Hebrews';
                  break;
              case 2180:tmpLabel = 'Hebrews';
                  break;
              case 2181:tmpLabel = 'Hebrews';
                  break;

              case 2182:tmpLabel = 'James';
                  break;
              case 2183:tmpLabel = 'James';
                  break;
              case 2184:tmpLabel = 'James';
                  break;
              case 2185:tmpLabel = 'James';
                  break;

              case 2186:tmpLabel = '1 Peter';
                  break;
              case 2187:tmpLabel = '1 Peter';
                  break;
              case 2188:tmpLabel = '1 Peter';
                  break;
              case 2189:tmpLabel = '1 Peter';
                  break;

              case 2190:tmpLabel = '2 Peter';
                  break;
              case 2191:tmpLabel = '2 Peter';
                  break;
              case 2192:tmpLabel = '2 Peter';
                  break;
              case 2193:tmpLabel = '2 Peter';
                  break;

              case 2194:tmpLabel = '1 John';
                  break;
              case 2195:tmpLabel = '1 John';
                  break;
              case 2196:tmpLabel = '1 John';
                  break;
              case 2197:tmpLabel = '1 John';
                  break;


              case 2198:tmpLabel = '2 John';
                  break;
              case 2199:tmpLabel = '2 John';
                  break;
              case 2200:tmpLabel = '2 John';
                  break;
              case 2201:tmpLabel = '2 John';
                  break;


              case 2202:tmpLabel = '3 John';
                  break;
              case 2203:tmpLabel = '3 John';
                  break;
              case 2204:tmpLabel = '3 John';
                  break;
              case 2205:tmpLabel = '3 John';
                  break;

              case 2205:tmpLabel = 'Jude';
                  break;
              case 2206:tmpLabel = 'Jude';
                  break;
              case 2207:tmpLabel = 'Jude';
                  break;
              case 2208:tmpLabel = 'Jude';
                  break;


              case 2209:tmpLabel = 'Revelation';
                  break;
              case 2210:tmpLabel = 'Revelation';
                  break;
              case 2211:tmpLabel = 'Revelation';
                  break;
              case 2212:tmpLabel = 'Revelation';
                  break;



          }
  
          console.debug(current_year + "returning "+tmpLabel)
          return "" + tmpLabel });
      x_translations = [utils.axis.x.range()[0] + 20, utils.axis.x.range()[1] - popup_width - 20];
      change_pos = function(pos) {
        popup_position = pos;
        return popup.attr("transform", "translate(" + x_translations[popup_position] + " " + (utils.axis.y.range()[1] + 20) + ")");
      };
      if (popup_position === null || (popup_position === 1 && (mouse_x - last_mouse_x > 0) && mouse_x > x_translations[1] - 30)) {
        change_pos(0);
      } else if (popup_position === 0 && (mouse_x - last_mouse_x < 0) && mouse_x < x_translations[0] + popup_width + 30) {
        change_pos(1);
      }
      last_mouse_x = mouse_x;
      svg.select("#circles").selectAll(".circle").call(move_circles);
      prenom_summaries = popup.selectAll("g.prenom_summary");
      prenom_summaries.select("text.prenom").text(function(prenom_data) {
        return prenom_data.prenom_sexued;
      });
      return prenom_summaries.select("text.naissances").text(function(prenom_data) {
        var c;
        c = prenom_data.years[current_year - utils.years[0]];
        if (c === 0) {
          return "no occurrence";
        } else {
          return c + " occurrence" + (c > 1 ? "s" : "");
        }
      });
    });
    popup.update = function() {
      var circles, content, margin_y, new_circles, new_prenom_summaries, prenom_summaries, prenom_summary_height, prenom_summary_width, total_height, y_text_offset;
      prenom_summaries = popup.selectAll("g.prenom_summary").data(utils.prenoms_selection, function(d) {
        return d.unique_id;
      });
      prenom_summaries.exit().remove();
      new_prenom_summaries = prenom_summaries.enter().append("g").classed("prenom_summary", true);
      content = new_prenom_summaries.append("g");
      prenom_summary_height = 25;
      prenom_summary_width = popup_width - 20;
      content.append("rect").attr("class", "bg").attr("x", 0).attr("y", 0).attr("width", prenom_summary_width).attr("height", prenom_summary_height);
      content.append("circle").attr("fill", utils.prenom_color_scale).attr("cx", prenom_summary_height / 2).attr("cy", prenom_summary_height / 2).attr("r", 4);
      y_text_offset = prenom_summary_height - 8;
      content.append("text").classed("prenom", true).attr("y", y_text_offset).attr("x", 25).text(function(p) {
        return p.prenom;
      });
      content.append("text").classed("naissances", true).attr("y", y_text_offset).attr("x", prenom_summary_width - 10).attr("text-anchor", "end");
      margin_y = 1;
      total_height = prenom_summary_height + margin_y;
      prenom_summaries.attr("transform", function(d, i) {
        return "translate(10 " + ((i + 1) * total_height + 10) + ")";
      });
      popup.select("* > rect.bg").attr("height", (utils.prenoms_selection.length - 1) * total_height + 75);
      circles = svg.select("#circles").selectAll(".circle").data(utils.prenoms_selection, function(d) {
        return d.unique_id;
      });
      circles.exit().remove();
      new_circles = circles.enter().append("g").attr("class", "circle").attr("opacity", 0).attr("transform", "");
      new_circles.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 7).attr("fill", utils.prenom_color_scale);
      new_circles.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 5).attr("fill", "white");
      return new_circles.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 4).attr("fill", utils.prenom_color_scale);
    };
    return popup;
  });

}).call(this);
