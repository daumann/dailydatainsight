// Generated by CoffeeScript 1.6.3
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["d3", "utils", "pubsub", "d3_compat", "common", "popup"], function(d3, utils, PubSub, d3_compat, common, popup) {
    return function() {
      var h, line_generator, redraw_existing_labels, redraw_existing_lines, svg, transform_for_prenom_label, update_lines, update_y_axis, x_axis, y_axis, year, year_zoomers;
      x_axis = d3.svg.axis().scale(utils.axis.x).orient("bottom").tickValues((function() {
        var _i, _len, _ref, _results;
        _ref = utils.years;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          year = _ref[_i];
          if (year % 5 === 0) {
            _results.push(year);
          }
        }
        return _results;
      })()).tickFormat(function(d) {
          tmpLabel = "";
          switch (d) {
              case 1960:
                  tmpLabel = "Old Testament / Surah 1-78";
                  break;
              case 2100:
                  tmpLabel =  "New Testament / Surah 78-114";
                  break;
            
              
              default:
              return "";
             
          }
                  return tmpLabel;
          
          
      
      
      }).orient("bottom");
      y_axis = d3.svg.axis().scale(utils.axis.y).orient("left").tickFormat(String).ticks(6);
      svg = d3.select("svg");
      transform_for_prenom_label = function(labels_selection, translate_y_to_zero) {
        if (translate_y_to_zero == null) {
          translate_y_to_zero = false;
        }
        return labels_selection.attr("transform", function(prenom_data) {
          var count, i, max_count, max_year, pt, year_range, _i, _j, _len, _ref, _ref1, _ref2, _results;
          year_range = (function() {
            _results = [];
            for (var _i = _ref = utils.axis.x.domain()[0], _ref1 = utils.axis.x.domain()[1]; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
            return _results;
          }).apply(this);
          max_count = 0;
          max_year = year_range[0];
          _ref2 = prenom_data.years;
          for (i = _j = 0, _len = _ref2.length; _j < _len; i = ++_j) {
            count = _ref2[i];
            year = utils.years[0] + i;
            if (__indexOf.call(year_range, year) < 0) {
              continue;
            }
            if (count > max_count) {
              max_count = count;
              max_year = year;
            }
          }
          pt = [utils.axis.x(max_year) + 5, utils.axis.y(max_count) - 15];
          if (translate_y_to_zero) {
            pt[1] = utils.axis.y.range()[0];
          }
          return "translate(" + pt[0] + " " + pt[1] + ")";
        });
      };
      redraw_existing_lines = function(lines) {
        return lines.style("clip-path", "url(#graphs_clip_path)").select("g path").attr("d", function(prenom_data) {
          return line_generator(prenom_data.years);
        });
      };
      redraw_existing_labels = function(labels) {
        return labels.call(transform_for_prenom_label);
      };
      line_generator = d3.svg.line().x(function(pt, i) {
        return utils.axis.x(utils.years[0] + i);
      }).y(utils.axis.y).tension(0.1).interpolate("linear");
        
      PubSub.subscribe("window:resize", function(msg, _arg) {
        var height, margin, playground_width, w, width, year_zoomers;
        width = _arg[0], height = _arg[1];
        utils.axis.x.range([75, 1000]);
        utils.axis.y.range([height - 80, 50]);
        y_axis.tickSize(-(utils.axis.x.range()[1] - utils.axis.x.range()[0]), 0, 1);
        x_axis.tickSize(-(utils.axis.y.range()[0] - utils.axis.y.range()[1]), 0, 1);
        svg.select("#x_axis").attr("transform", "translate(0, " + (utils.axis.y.range()[0] + 6) + ")").call(x_axis);
        svg.select("#y_axis").attr("transform", "translate(" + (utils.axis.x.range()[0]) + ", 0)").call(y_axis);
        svg.select("defs #graphs_clip_path rect").attr("x", utils.axis.x.range()[0]).attr("y", 0).attr("width", utils.axis.x.range()[1] - utils.axis.x.range()[0]).attr("height", height);
        svg.selectAll("#playground_bg, #playground").attr("x", utils.axis.x.range()[0]).attr("y", utils.axis.y.range()[1]).attr("style", 800).attr("height", utils.axis.y.range()[0] - utils.axis.y.range()[1]);
        svg.select("#playground").attr("width", utils.axis.x.range()[1] - utils.axis.x.range()[0] + 20);
        svg.selectAll("#prenoms #lines g").call(redraw_existing_lines);
        svg.selectAll("#prenoms #labels g").call(redraw_existing_labels);
        margin = 10;
        playground_width = utils.axis.x.range()[1] - utils.axis.x.range()[0];
        w = (playground_width - 5 * margin) / 6;
       
        year_zoomers.select("text").attr("x", w / 2);
        return year_zoomers.select("rect").attr("width", w);
      });
  

      h = 32;
   
      update_y_axis = function(max) {
        max = Math.max(max, 100);
        utils.axis.y.domain([0, max]);
        svg.select("#y_axis").transition().duration(utils.duration).call(y_axis);
        return PubSub.publishSync("axis:y:update");
      };
      update_lines = function() {
        var bbox, clip_path_id, disappear, el, initial_line, labels, left_to_right_appear_transition, lines, margin, new_labels, new_lines, new_max, transform, x_pos, _i, _ref, _ref1, _results;
        new_max = utils.max_for_prenoms(utils.prenoms_selection, (function() {
          _results = [];
          for (var _i = _ref = utils.axis.x.domain()[0], _ref1 = utils.axis.x.domain()[1]; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this));
        update_y_axis(new_max);
        initial_line = line_generator((function() {
          var _j, _len, _ref2, _results1;
          _ref2 = utils.years;
          _results1 = [];
          for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
            year = _ref2[_j];
            _results1.push(0);
          }
          return _results1;
        })());
        lines = svg.select("#prenoms #lines").selectAll("g").data(utils.prenoms_selection, function(d) {
          return d.unique_id;
        });
        new_lines = lines.enter().append("g").attr("opacity", 1).classed("line", true);
        /*
          .each (d, data_index) ->
            current_length = 0
            point = this.getPointAtLength(current_length)
            length = this.getTotalLength()
            for year, i in utils.years
              year_x = utils.axis.x(year)
              while point.x <= year_x and current_length <= length
                point = this.getPointAtLength(current_length += 1)
              d3.select(this.parentNode)
                .append("circle")
                .style('visibility', 'hidden')
                .attr("fill", utils.prenom_color_scale d.prenom)
                .attr("cx", point.x)
                .attr("cy", point.y)
                .attr("r", 5)
        */

        margin = {
          vertical: 2,
          horizontal: 10
        };
        x_pos = utils.axis.x.range()[0] + 25;
        if (false && (el = _.last((d3.selectAll("g.label")[0])))) {
          bbox = el.getBBox();
          transform = d3.transform(d3.select(el).attr("transform"));
          x_pos = transform.translate[0] + bbox.width + margin.horizontal;
        }
        lines.transition().duration(utils.duration).call(redraw_existing_lines);
        clip_path_id = function(prenom_data, i) {
          return "clip_path_prenom_" + i;
        };
        new_lines.append("clipPath").attr("class", "clippath").attr("id", clip_path_id).append("rect").attr("x", utils.axis.x.range()[0]).attr("width", 0).attr("y", utils.axis.y.range()[1] - 10).attr("height", utils.axis.y.range()[0] - utils.axis.y.range()[1] + 20);
        new_lines.append("path").attr("stroke", utils.prenom_color_scale).style("clip-path", function(prenom_data, i) {
          return "url(#" + (clip_path_id(prenom_data, i)) + ")";
        }).attr("d", function(prenom_data) {
          return line_generator(prenom_data.years);
        });
        left_to_right_appear_transition = new_lines.transition().duration(utils.duration).ease("linear");
        left_to_right_appear_transition.select(".clippath").remove().select("rect").attr("width", utils.axis.x.range()[1] - utils.axis.x.range()[0]);
        left_to_right_appear_transition.select("path").each('end', function() {
          return d3.select(this).style("clip-path", "url(#graphs_clip_path)");
        });
        labels = svg.select("#prenoms #labels").selectAll("g").data(utils.prenoms_selection, function(d) {
          return d.unique_id;
        });
        labels.transition().duration(utils.duration).call(redraw_existing_labels);
        new_labels = labels.enter().append("g").attr("opacity", 1).on('click', function(prenom_data) {
          return PubSub.publish("prenom:remove", prenom_data);
        }).style('cursor', 'pointer').each(function(prenom_data, data_index) {
          var g, padding, rect, text;
          g = d3.select(this);
          g.call(transform_for_prenom_label);
          padding = {
            top: 6,
            bottom: 3,
            horizontal: 10
          };
          rect = g.append("rect");
          text = g.append("text").text(function(d) {
            return d.prenom_sexued;
          }).attr("x", padding.horizontal).attr("y", 0);
          bbox = text.node().getBBox();
          x_pos += bbox.width + padding.horizontal * 2 + margin.horizontal;
          return rect.attr("fill", utils.prenom_color_scale).attr("x", bbox.x + bbox.width / 2).attr("y", bbox.y + bbox.height / 2).transition().duration(utils.duration).attr("x", bbox.x - padding.horizontal).attr("y", bbox.y - padding.top).attr("width", bbox.width + padding.horizontal * 2).attr("height", bbox.height + padding.bottom + padding.top);
        });
        disappear = function(sel) {
          return sel.exit().transition().ease('exp-out').duration(utils.duration).attr("opacity", 0).remove();
        };
        disappear(lines).select("g.line path").attr("d", initial_line);
        disappear(labels).call(transform_for_prenom_label, true);
        return popup.update();
      };
      PubSub.subscribe("year_range_update", function(msg, range) {
        var _i, _ref, _ref1, _results;
        utils.axis.x.domain(range);
        svg.select("#x_axis").transition().duration(utils.duration).call(x_axis);
        update_y_axis(utils.max_for_prenoms(utils.prenoms_selection, (function() {
          _results = [];
          for (var _i = _ref = utils.axis.x.domain()[0], _ref1 = utils.axis.x.domain()[1]; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this)));
        /*
        svg
          .selectAll("#prenoms #lines g")
          .style("clip-path", "url(#graphs_clip_path)")
        */

        svg.selectAll("#prenoms #lines g").transition().duration(utils.duration).call(redraw_existing_lines);
        return svg.selectAll("#prenoms #labels g").transition().duration(utils.duration).call(redraw_existing_labels);
      });
      PubSub.subscribe("prenom:remove", function(msg, prenom) {
        utils.prenoms_selection.remove(prenom);
        return update_lines();
      });
      return PubSub.subscribe("prenom:add", function(msg, prenom) {
        utils.prenoms_selection.add(prenom);
        return update_lines();
      });
    };
  });

}).call(this);
