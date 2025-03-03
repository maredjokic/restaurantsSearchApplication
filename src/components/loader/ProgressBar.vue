<template>
  <div class="progress-container">
    <div class="progress-bar"></div>
  </div>
</template>

<style scoped>
.progress-container {
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  width: 30%;
  height: 100%;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  border-radius: 10px;
  position: absolute;
  left: -30%;
  animation: indeterminate 1.5s infinite ease-in-out;
}
</style>
