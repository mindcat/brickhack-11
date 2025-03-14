# brickhack-11

### goals: 

 - render floors and buildings from svg with three.js, including paths, etc. some general .obj meshes may be used for stairs, statues, or complex buildings...
 - AS much info as possible is stored in the svg: use gleam to parse the svg and calculate routes (using the svg to build the weighted graph that is used for pathfinding). Gleam can also be used to make svg (xml) tools to speed up producing the svgs for each floor.
  - 