
export function fahrenheitTransform(degrees){
    degrees -= 273.15;
    if(degrees < 10){
        degrees = degrees.toPrecision(1);
    }else{
        degrees = degrees.toPrecision(3);
    }
    return degrees;
}