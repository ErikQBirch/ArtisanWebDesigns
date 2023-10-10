const getStarRating = {
  grades : [2.4,2.8,2.9,3.4,3.9,4.8],
  average : 0,
  rating:0,
  stars:"",
  getAverage: function(){
    this.grades.forEach((grade, )=>{
      this.average = this.average+grade;
    });
    this.average = this.average/this.grades.length;
    this.rating = Math.round(this.average*2)/2;

    for(let i=0; i< (this.rating-(this.rating%1)); i++){
      this.stars = this.stars+"X";
    }
    if (this.rating%1 == 0.5){
      this.stars += "/";
    }

    console.log(this.stars, this.rating, this.average); 
;    return this.stars;
  }
}

getStarRating.getAverage();