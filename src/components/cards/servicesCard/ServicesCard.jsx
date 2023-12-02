import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import {FONT, SIZES, images} from '../../../../constants';

const ServicesCard = ({data, other}) => {
  return (
    <TouchableOpacity style={styles.container(other)}>
      <View style={styles.innerContainer}>
        <Image
          source={data.img}
          resizeMode="contain"
          style={styles.logoImage(other)}
        />
        <Text style={styles.serviceName}>{data.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServicesCard;

const styles = StyleSheet.create({
  container: other => ({
    margin: 5,
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#C8DDF0',
    height: 105.5,
    display: other ? 'flex' : null,
    flexDirection: other ? 'column' : null,
    justifyContent: other ? 'flex-end' : null, // Align text at the bottom of the container
  }),
  innerContainer: {
    marginTop: 10,
  },
  logoImage: other => ({
    width: '100%',
    height: other ? 60 : 70,
  }),
  serviceName: {
    textAlign: 'center',
    fontSize: SIZES.small,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    paddingHorizontal: 4,
    marginVertical: 4,
    height: 35,
  },
});

// import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

// import {FONT, SIZES, images} from '../../../../constants';

// const ServicesCard = ({data, other}) => {
//   return (
//     <TouchableOpacity style={styles.container(other)}>
//       <View style={styles.innerContainer}>
//         <Image
//           source={data.img}
//           resizeMode="contain"
//           style={styles.logoImage(other)}
//         />
//         <Text style={styles.serviceName}>{data.title}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default ServicesCard;

// const styles = StyleSheet.create({
//   container: other => ({
//     margin: 5,
//     width: '30%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     borderWidth: 0.5,
//     borderColor: '#C8DDF0',
//     height: 105.5,
//     display: other ? 'flex' : null,
//     flexDirection: other ? 'column' : null,
//     justifyContent: other ? 'flex-end' : null, // Align text at the bottom of the container
//   }),
//   innerContainer: {
//     marginTop: 10,
//   },
//   logoImage: other => ({
//     width: '100%',
//     height: other ? 60 : 70,
//   }),
//   serviceName: {
//     textAlign: 'center',
//     fontSize: SIZES.small,
//     fontFamily: FONT.medium,
//     color: '#000000',
//     paddingHorizontal: 4,
//     marginVertical: 4,
//     height: 35,
//   },
// });

// //circular

// // import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

// // import {FONT, SIZES, images} from '../../../../constants';

// // const ServicesCard = ({data, other}) => {
// //   return (
// //     <TouchableOpacity style={styles.container(other)}>
// //       <View style={styles.innerContainer}>
// //         <Image
// //           source={data.img}
// //           resizeMode="contain"
// //           style={styles.logoImage(other)}
// //         />
// //       </View>
// //       <Text style={styles.serviceName}>{data.title}</Text>
// //     </TouchableOpacity>
// //   );
// // };

// // export default ServicesCard;

// // const styles = StyleSheet.create({
// //   container: other => ({
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     margin: 5,
// //     marginBottom: 10,
// //     width: '30%',
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 15,
// //     height: 105.5,
// //     display: other ? 'flex' : null,
// //     flexDirection: other ? 'column' : null,
// //     justifyContent: other ? 'flex-end' : null, // Align text at the bottom of the container
// //   }),
// //   innerContainer: {
// //     marginTop: 10,

// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderRadius: 40,
// //     borderWidth: 2,
// //     borderColor: '#127DDD',
// //     width: 80,
// //     height: 80,
// //   },
// //   logoImage: other => ({
// //     width: '100%',
// //     height: other ? 50 : 50,
// //   }),
// //   serviceName: {
// //     fontFamily: 'Montserrat',
// //     fontSize: SIZES.small,
// //     fontStyle: 'normal',
// //     fontWeight: '700',
// //     lineHeight: 12,
// //     textAlign: 'center',
// //     fontSize: SIZES.small,
// //     color: '#000000',
// //     paddingHorizontal: 4,
// //     marginVertical: 4,
// //     height: 35,
// //   },
// // });

// //Square

// // import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

// // import {FONT, SIZES, images} from '../../../../constants';

// // const ServicesCard = ({data, other}) => {
// //   return (
// //     <TouchableOpacity style={styles.container(other)}>
// //       <View style={styles.innerContainer}>
// //         <Image
// //           source={data.img}
// //           resizeMode="contain"
// //           style={styles.logoImage(other)}
// //         />
// //       </View>
// //       <Text style={styles.serviceName}>{data.title}</Text>
// //     </TouchableOpacity>
// //   );
// // };

// // export default ServicesCard;

// // const styles = StyleSheet.create({
// //   container: other => ({
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     margin: 5,
// //     marginBottom: 10,
// //     width: '30%',
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 15,
// //     height: other ? 110 : 90,
// //     display: other ? 'flex' : null,
// //     flexDirection: other ? 'column' : null,
// //     justifyContent: other ? 'flex-end' : null, // Align text at the bottom of the container
// //   }),
// //   innerContainer: {
// //     marginTop: 10,
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderRadius: 12,
// //     // borderRadius: 40,
// //     borderWidth: 2,
// //     borderColor: '#127DDD',
// //     width: 80,
// //     height: 80,
// //   },
// //   logoImage: other => ({
// //     width: '100%',
// //     height: other ? 50 : 50,
// //   }),
// //   serviceName: {
// //     // marginTop: 3,
// //     fontFamily: 'Montserrat',
// //     fontSize: SIZES.small,
// //     fontStyle: 'normal',
// //     fontWeight: '700',
// //     lineHeight: 12,
// //     textAlign: 'center',
// //     fontSize: SIZES.small,
// //     color: '#000000',
// //     paddingHorizontal: 4,
// //     marginVertical: 4,
// //     height: 35,
// //   },
// // });
