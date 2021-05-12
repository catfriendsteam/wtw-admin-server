import { fcm } from '../app';

export function postFCM(title: string) {
  const commonNotification = {
    title: `냐한남자-냐한친구들`,
    body: title,
  };
  // const android={
  //     collapse_key:"",
  //     priority: "normal",
  //     ttl: "",
  //     restricted_package_name:"",
  //     data:{

  //     },
  //     notification: {
  //         color:"#FF528B"
  //     },
  //     fcm_options:{},
  //     direct_boot_ok:
  // }
  // const iOS={

  // }
  const message = {
    notification: commonNotification,
    // condition: '',
    topic: 'test',
  };
  fcm.send(message).then((res) => {
    console.log(`${res}`);
  });
}
