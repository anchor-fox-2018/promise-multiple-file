const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(inputFile) {
  // psst, the promise should be around here...
  return new Promise(function(resolve,rejects){
    fs.readFile(inputFile,'utf8',function(err,data){
      if(err){
        rejects(err)
      }else{
        //console.log(data)
        resolve(data)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
    .then(function(data){
      //sleep.sleep(5)
      parent_data =JSON.parse(data)
      //console.log(parent_data)
    })
    .catch(function(err){
      console.log('ERROR:',err)
    })
  readFilePromise(childrenFileName)
    .then(function(data){
      children_data = JSON.parse(data)
      for(let i = 0;i < parent_data.length;i++){
        let isi = []
        for(let j = 0;j < children_data.length;j++){
          if(parent_data[i].last_name === children_data[j].family){
            isi.push(children_data[j].full_name);
            
          }
        }
        //console.log(isi)
        parent_data[i].childrens = isi;
        //sleep.sleep(1)
        //console.log(parent_data[i])
      }
      // var clear = require('clear')
      // clear()
      sleep.sleep(5)
      console.log(parent_data)
      
    }) 
    .catch(function(err){
      console.log('ERROR:',err)
    }) 
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
//matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
//matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');