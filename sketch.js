let truncation_value = 0.8;


//Conect to your runway model. Replace the 'URL' and 'token' info with your own links.
//You can get this info from the Hosted Models section of Runway.
//Click on the line labled code </>

const model = new rw.HostedModel({
  url: "YOUR_MODEL_URL",
  token: "YOUR_TOKEN",
});

if(typeof(model)=='undefined'){
  console.log('model inactive')
} else {
  console.log('model active')
  document.querySelectorAll('#inactive')[0].classList.add('hidden')
}

async function checkModel() {
  document.querySelector('body').classList.add('loading')
  if(typeof(model)!='undefined'){
    await model.waitUntilAwake();
    document.querySelector('body').classList.remove('loading')
  }
}

function setup() {
  // create canvas
  pixelDensity(1)
  createCanvas(1024, 1044);
  //Creat the button
  button = createButton('click me');
  button.mousePressed(getImageFromRunway);
  checkModel();
}

function draw() {
  //Draw the button
  button.position(10, 10);
}

//Query the Hosted model and generate an result values 
async function getImageFromRunway() {
  z = createZ(512)
  const data = {
    z: z,
    truncation: truncation_value
  };

  if(typeof(model)!='undefined'){
    const result = await model.query(data)
    gotImage(result)
  }
}

//translate the results values into an image 
function gotImage(result) {
  i = createImg(result.image, imageReady);
  i.hide();
}

//Draw Image to screen
function imageReady() {
  image(i, 0, 0,512,512);
}

//Generate array of 512 random floats between -1 and 1
function createZ(v) {
  let z =[];
  for(let zi = 0; zi < v; zi++){
    z.push(random(-1, 1))
  }
  return z;
}
