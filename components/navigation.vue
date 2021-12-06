<template>
<header>
  <div class="header_container">
    <div>
      <NuxtLink to="/"><img src="~/assets/Hammer_long.png" alt=""></NuxtLink>
    </div>

    <div class="header_navigation">
      <ul>
        <NuxtLink to="/"><li>Home</li></NuxtLink>
        <NuxtLink to="/maps"><li>Home</li></NuxtLink>
        <NuxtLink to="/about"><li>About</li></NuxtLink>
      </ul>
    </div>
  </div>
</header>
</template>

<style lang="scss">
header {
    width: 100%;
    box-shadow: 0px 0px 5px #000a;
    background-color: #262626;
    position: fixed;
    z-index: 100;
    top: 0;

    .header_container {
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        height: 100%;
        justify-content: space-between;
        padding: 15px 0;
        img {
            height: 60px;
        }
    }
    .header_navigation {
        list-style: none;

        ul {
            padding: 0;
            margin: 0;
        }

        ul li {
            list-style: none;
            float: left;
            height: 60px;
            line-height: 60px;
            margin-left: 10px;
            font-weight: bold;
            padding: 0px 10px;
            border-radius: 5px;
            color: #f2f2f2;
        }

        ul li:hover {
            background: #fff1;
        }
        ul li:active {
            background: #ffffff08;
        }
    }
}
</style>
