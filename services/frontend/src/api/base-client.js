import axios from 'axios';

const buildClient = (context) => {
  if(typeof window === 'undefined'){
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: context.req.headers
    })
  }else{
    return axios.create({
      baseURL: '/'
    })
  }
}

export default buildClient;