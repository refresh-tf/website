export default {
  data(){
    return {
      uriPrefix: '',
      uriValue: ''
    }
  },
  computed: {
    uri(){ return this.uriPrefix + '-' + this.uriValue; },
    url(){ return this.$route.path + '#' + this.uri; },
    fullUrl() { return window.location.host + this.url; }
  },
  methods: {
    linked($event){
      $event.preventDefault();
      window.location.hash = this.uri;
      navigator.clipboard.writeText(this.fullUrl);
      this.$el.open = true;
    },
  }
}
