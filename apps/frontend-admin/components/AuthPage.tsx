// /**
//  * Description: A page requiring user to sign in before proceeding.
//  * Author: Hieu Chu
//  */

// import { Button } from 'antd'
// import { useAuth0 } from './auth0-components'

// export default () => {
//   const { loginWithRedirect } = useAuth0()

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '90%'
//       }}
//     >
//       <Button
//         type="primary"
//         size="large"
//         style={{
//           width: 250
//         }}
//         onClick={() => loginWithRedirect({})}
//       >
//         Sign in to continue
//       </Button>
//     </div>
//   )
// }
