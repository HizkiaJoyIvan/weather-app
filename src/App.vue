<template>
  <div class="bg-cyan-800 h-screen w-screen flex flex-col">
    <div class="flex justify-center mt-5">
      <input 
        type="text" 
        placeholder="Search..." 
        class="px-2 py-1 w-[50%] rounded-md border-none text-slate-800 font-semibold outline-none opacity-75 focus:opacity-85"
        v-model="query"
        @keypress="fetchWeather"
      />
    </div>
    <div 
      class="flex flex-col items-center mt-10 gap-5"
      v-if="(typeof weather.main != 'undefined')"
    >
      <div class="text-4xl font-bold text-white opacity-80">{{ weather.name }}, {{ weather.sys.country }}</div>
      <div class="text-white opacity-90 font-semibold">{{ dateBuilder() }}</div>
      <div class="bg-white opacity-40 py-5 px-2 text-7xl text-center rounded-lg font-extrabold shadow-md">{{ weather.main.temp }}ºC</div>
      <div class="text-3xl text-white font-bold opacity-90">{{ weather.weather[0].main }}</div>
      <div 
        class="text-slate-200 font-semibold hover:cursor-pointer hover:text-white"
        @click="showMoreInfo"
      >
        More information
      </div>
    </div>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="bg-white p-8 rounded-lg shadow-md">
        <div class="flex justify-between">
          <div>
            <div class="text-gray-600 font-semibold">
              Min Temp: {{ weather.main.temp_min }}ºC<br>
              Max Temp: {{ weather.main.temp_max }}ºC<br>
              Wind: {{ weather.wind.speed }} m/s<br>
              Feels like: {{ weather.main.feels_like }}ºC
            </div>
          </div>
        </div>
        <div class="mt-4 text-right">
          <button @click="closeMoreInfo" class="text-white bg-cyan-700 hover:bg-cyan-600 p-2 rounded-md font-semibold">Close</button>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        api_key: '87274c464f83246a5bdb4d545994e43f',
        url_base: 'http://api.openweathermap.org/data/2.5/',
        query: '',
        weather: {},
        showModal: false
      }
    },
    methods: {
      fetchWeather(e) {
        if(e.key == "Enter") {
          fetch(`${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`)
            .then(res => {
              return res.json()
            })
            .then(this.setResults)
        }
      },
      setResults (res) {
        this.weather = res
      },
      dateBuilder() {
        let d = new Date()
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let day = days[d.getDay()]
        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()
        return `${day}, ${date} ${month} ${year}`
      },
      showMoreInfo() {
        this.showModal = true
      },
      closeMoreInfo() {
        this.showModal = false
      }
    }
  }
</script>

<style lang="scss" scoped></style>
