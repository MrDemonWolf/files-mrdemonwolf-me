export default function ({ redirect, $config }) {
  if (!$config.registration) {
    return redirect('/')
  }
}
