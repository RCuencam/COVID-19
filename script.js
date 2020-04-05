
function initMap(lat,lng)
{
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng: lng},
    zoom: 5
    });

    var styledMapType = new google.maps.StyledMapType(
        [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#181818"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1b1b1b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#2c2c2c"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8a8a8a"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#373737"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3c3c3c"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#4e4e4e"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3d3d3d"
                }
              ]
            }
          ]
    )
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    setTimeout(()=>
    {
      var marker=new google.maps.Marker({
        position:{lat: lat, lng: lng},
        map:map,
        icon:"src/image.png"
      });
    },500)
}

// Cases, Recovered and Deaths

const $casesContainer=document.querySelector(".cases")
const $recoveredContainer=document.querySelector(".recovered")
const $deathsContainer=document.querySelector(".deaths")

const $form=document.querySelector(".form")
const $button=document.querySelector(".button")
const $country=document.querySelector(".country")
const $update=document.querySelector(".update")

async function getData(URL)
{
  try {
    const response=await fetch(URL)
    const data=response.json()
    return data
  } catch(error){
    console.log("asdasd")
  }
}
function modalError()
{
  Swal.fire(
    'Error!',
    'Nombre no existente!',
    'error'
  )
}
async function getStats(URL)
{
  const data=await getData(URL)
  const hora= new Date(data.updated)

  if(data.message)
  {
    modalError()
  }
  else
  {
    $casesContainer.textContent=data.cases
    
    $recoveredContainer.textContent=data.recovered
    
    $deathsContainer.textContent=data.deaths
    
    $country.textContent=data.country
    
    $update.textContent=`Última Actualización: ${hora.toLocaleDateString()} a las ${hora.toLocaleTimeString()}`
    initMap(data.countryInfo.lat,data.countryInfo.long)
  }
}

function getForm()
{
  $button.addEventListener("click",async (e)=>
  {
    e.preventDefault()
    const data=new FormData($form)
    const URLCountry=`https://corona.lmao.ninja/countries/${data.get("text")}`
    getStats(URLCountry)
    window.scroll({
      top: 200,
      left: 0,
      behavior: 'smooth'
    });
  })
}
async function load()
{
  initMap(-10,-76)
  const URLAll="https://corona.lmao.ninja/all"
  getStats(URLAll)
  getForm()
}

load()