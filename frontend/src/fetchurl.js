export default function fetchUrl() {
  if(process.env.NODE_ENV === "production"){
    return "http://52.23.73.190:3003/"

  }else if(process.env.NODE_ENV === "development"){
    return "http://localhost:3003/"
  }  

}
