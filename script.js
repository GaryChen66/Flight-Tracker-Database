$(document).ready(function() {
    var city_list = [];
    var country_list = [];
    var airport_list = [];
    $.getJSON("database/countries.json", function(countries) {
        var i;
        country_list = countries.sort(function(a, b) {
            if (a.nameCountry < b.nameCountry) {
                return -1;
            }
            return 1;
        });
        for (i = 0; i < countries.length; i++) {
            $("#country_list").append(
                "<option value='" +
                    countries[i].codeIso2Country +
                    "'>" +
                    countries[i].nameCountry +
                    "</option>",
            );
        }
    });
    $.getJSON("database/cities.json", function(cities) {
        city_list = cities.sort(function(a, b) {
            if (a.nameCity < b.nameCity) {
                return -1;
            }
            return 1;
        });
    });
    $.getJSON("database/airport.json", function(airports) {
        airport_list = airports.sort(function(a, b) {
            if (a.nameAirport < b.nameAirport) {
                return -1;
            }
            return 1;
        });
    });

    $("#country_list").change(function() {
        var counry = $(this).val();
        $("#city_list").html("");
        var city_in_country = city_list.filter(
            item => item.codeIso2Country == counry,
        );
        for (i = 0; i < city_in_country.length; i++) {
            $("#city_list").append(
                "<option value='" +
                    city_in_country[i].codeIataCity +
                    "'>" +
                    city_in_country[i].nameCity +
                    "</option>",
            );
        }

        if (i == 0) {
            $("#city_list").html(
                "<option selected disabled>There is no city</option>",
            );
        }
        City_Changed();
    });
    $("#city_list").change(function() {
        City_Changed();
    });
    function City_Changed() {
        $("#airport_list").html("");
        var city = $("#city_list").val();
        var airport_in_country = airport_list.filter(
            item => item.codeIataCity == city,
        );
        for (i = 0; i < airport_in_country.length; i++) {
            $("#airport_list").append(
                "<option value='" +
                    airport_in_country[i].codeIataAirport +
                    "'>" +
                    airport_in_country[i].nameAirport +
                    "</option>",
            );
        }
        if (i == 0) {
            $("#airport_list").html(
                "<option selected disabled>There is no airport</option>",
            );
        }
    }
});
