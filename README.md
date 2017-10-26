# alpha preview

<h1 align="center">
  <img src="https://user-images.githubusercontent.com/328000/29147428-d6619ef2-7d1b-11e7-9cbd-286b7ae5fe49.png" alt="syr" title="syr">
    <br>
  syr
  <br>
  https://dmikey.github.io/syr
</h1>
<p align="center" style="font-size: 1.2rem;">minimally obtrusive reactisque view engine, aimed at native developers</p>

Build dynamic UIs for Native Platforms, with less than 200kb of extra libraries! The goal of this library is provide Native SDK developers with the benefits of the React Native Eco System, with a much smaller footprint and reduced complexity.

We want you to be able to package Syr with your Native SDK, and be able to drive dynamic experiences with it.

Syr uses a React like API with a custom JS API bridge, that allows an SDK developer to bundle an updatable experience through Apple's iTunes terms.

A carefully crafted SDK can be enhanced or tested without needing to deploy multiple binaries.

The ultimate goal was not to recreate React, nor chase something like Preact. Through the magic of Babel and Webpack, we've adopted a similar set of technologies that allow us ease and familiar use, while meeting the goal of pushing AST over the JavaScript Bridges in each native environment (including the web).

The Native Libraries, are crafted that you can use a simple 'Find and Replace' method to sandbox them off from the rest of the world. We've gone out of our way to ensure portability for SDK developers, who want to the benefits of a dynamic script based UI, and the benefits of native integration.

### dev docs

https://dmikey.github.io/syr