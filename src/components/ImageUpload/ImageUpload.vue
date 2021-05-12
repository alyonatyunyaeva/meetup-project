<template>
  <div class="form-group">
    <FormLabel>Изображение</FormLabel>
    <div :style="backgroundImg" class="preview" @click="clickToUpload">
      <input
        ref="file"
        @change="onUploadImage()"
        type="file"
        accept="image/*"
        style="display: none"
      />
      <div v-if="!image">Загрузить изображение</div>
      <div v-else>Удалить изображение</div>
    </div>
  </div>
</template>

<script>
import FormLabel from "@/components/FormLabel/FormLabel";

export default {
  components: { FormLabel },
  props: {
    initialImg: String,
  },
  data() {
    return {
      rawImage: null,
      image: null,
    };
  },
  computed: {
    backgroundImg() {
      if (this.image) {
        return { "--bg-url": `url('${this.image}')` };
      }
      if (this.initialImg) {
        return { "--bg-url": `url('${this.initialImg}')` };
      }
    },
  },
  methods: {
    clickToUpload() {
      if (this.image) {
        this.image = null;
        this.$emit("uploaded", null);

        return;
      }
      this.$refs.file.click();
    },
    prepareImg(file) {
      let formData = new FormData();
      formData.append("file", file);
      this.$emit("uploaded", formData);
    },

    onUploadImage() {
      this.rawImage = this.$refs.file.files[0];
      this.prepareImg(this.rawImage);
      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function() {
          this.image = reader.result;
        }.bind(this),
        false
      );

      if (this.rawImage) {
        if (/\.(jpe?g|png|gif)$/i.test(this.rawImage.name)) {
          reader.readAsDataURL(this.rawImage);
        }
      }
    },
  },
};
</script>

<style scoped src="./ImageUpload.scss" lang="scss"></style>
