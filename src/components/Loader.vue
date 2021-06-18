<template>
  <div class="backdrop">
    <div class="rotate">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

.rotate {
	position: relative;
	width: 90px;
	height: 90px;
}

.rotate div {
	width: 100%;
	height: 100%;
	position: absolute;
	border: 10px solid transparent;
	border-top-color: rgba(54, 187, 154, 0.8);
	border-radius: 50%;
	animation: spinnerOne 0.8s linear infinite;
}

.rotate div:nth-child(2) {
	border: 10px solid transparent;
	border-bottom-color: rgba(54, 187, 154, 0.8);
	animation: spinnerTwo 0.8s linear infinite;
}

@keyframes spinnerOne {
	0% {
		transform: rotate(0deg);
		border-width: 10px;
		opacity: 1;
	}
	50% {
		transform: rotate(180deg);
		border-width: 1px;
		opacity: 0.5;
	}
	100% {
		transform: rotate(360deg);
		border-width: 10px;
		opacity: 1;
	}
}

@keyframes spinnerTwo {
	0% {
		transform: rotate(0deg);
		border-width: 1px;
		opacity: 0.5;
	}
	50% {
		transform: rotate(180deg);
		border-width: 10px;
		opacity: 1;
	}
	100% {
		transform: rotate(360deg);
		border-width: 1px;
		opacity: 0.5;
	}
}
</style>