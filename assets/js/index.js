$(document).ready(function() {
  var cityCode = CodeMirror(document.getElementsByClassName('text-holder')[0], {
    mode: "xml",
    htmlMode: true,
    theme: "dracula"
  });
  $.ajax({
    url: "cities.json",
    type: 'GET',
    dataType: 'JSON',
    success: function(res) {
      var cityArray = [];
      var cityString = '';
      for (i in res) {
        if (res[i].country === "BA"){
          var currentCity = res[i].name;
          var sterilisedValue = currentCity.replace(/\s/g, '').toLowerCase();
          sterilisedValue = sterilisedValue.replace(/ć/g, 'c');
          sterilisedValue = sterilisedValue.replace(/č/g, 'c');
          sterilisedValue = sterilisedValue.replace(/ž/g, 'z');
          sterilisedValue = sterilisedValue.replace(/đ/g, 'd');
          sterilisedValue = sterilisedValue.replace(/š/g, 's');
          var value = '  <option value="' + sterilisedValue + '">' + currentCity + '</option>';
          cityArray.push(value)
        }
      }
      cityArray.sort();
      for (var i = 0; i < cityArray.length; i++){
        cityString += cityArray[i] + '\r\n';
      }
      cityCode.setValue("<select>\r\n" + cityString + "</select>")
    }
  });
});
