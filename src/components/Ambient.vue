<template>
  <div id="ambient" class="glow"></div>
</template>

<script>
import {FastAverageColor} from "fast-average-color";

export default {
  name: "Ambient",
  props: {
    imageElementName: String
  },
  setup() {
    const fac = new FastAverageColor();

    return { fac }
  },
  mounted() {
    const imageElement = document.getElementById(this.imageElementName);

    if (imageElement === null) return;

    imageElement.crossOrigin = 'anonymous';

    imageElement.onload = () => {
      this.fac.getColorAsync(imageElement, {
        mode: 'precision',
        algorithm: "dominant",
        ignoredColor: [[255, 255, 255, 255, 80], [0, 0, 0, 255, 70]]
      }).then(color => {
        document.getElementById('ambient').style.color = color.rgb;
      }).catch(e => {
        console.log(e);
      });
    }
  },
}
</script>

<style scoped>

</style>