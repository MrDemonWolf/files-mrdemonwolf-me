<template>
  <div class="container mx-auto">
    <table class="shadow-lg bg-white w-full">
      <thead>
        <tr>
          <th class="bg-blue-100 border text-left px-8 py-4">File</th>
          <th class="bg-blue-100 border text-left px-8 py-4">Size</th>
          <th class="bg-blue-100 border text-left px-8 py-4">Uploaded</th>
          <th class="bg-blue-100 border text-left px-8 py-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="{ name, fileSize, uploadedAt, index } in uploads"
          :key="index"
        >
          <td class="border px-8 py-4">{{ name }}</td>
          <td class="border px-8 py-4">{{ fileSize }}</td>
          <td class="border px-8 py-4">{{ uploadedAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploads: [
        {
          hashes: {
            md5: '5d4b76e4727d295d1104f681406c2038',
            sha256:
              '932d114496a9897acba8bfd1bc80760eeeac36265e61d8764dfe934ce5077d53',
            sha512:
              '4585db8f86a27a447aca3abc2842191821ee88f4ee3cb35fdb0cdac4fc035f0097aca150704fa1d6f703f216fe0277708dce2585dddab9e47f6d9c04c75d159e',
          },
          fileType: 'file',
          storage: 'local',
          tags: [],
          uploadedAt: '2020-07-18T15:54:03.256Z',
          _id: '5f131b434d3200322786b460',
          uploader: '5f131400dfc73f0a71dbd929',
          name: 'mrdemonwolf',
          fileOriginalName: 'mrdemonwolf',
          fileName: '9u9uMwhlFTgce34Ts4QKjsqS4sgkbIcz',
          fileExtension: '.png',
          fileMimeType: 'image/png',
          fileSize: '8679',
          deleteToken: 'IunEb97BE1roanu77xHj9FK3y3Tj9U8c',
          __v: 0,
        },
        {
          hashes: {
            md5: 'cc35c4e5e26ffd832fb22f4108fd0c9f',
            sha256:
              'd86e19ed2246a2101aeaa981919d46b86cc4e4713123f6642353a0cfd8e9e4cc',
            sha512:
              '09f8a08cc5fad47b6684a0674c3d2969969242534b7f25ba81f2420e9df65a583b5621abd1e7d60a5aa6b794348ca0be25a33c024e7b2f0127591e4dd652cea5',
          },
          fileType: 'image',
          storage: 'local',
          tags: [],
          uploadedAt: '2020-07-18T15:54:03.256Z',
          _id: '5f131be24d3200322786b462',
          uploader: '5f131400dfc73f0a71dbd929',
          name: 'logo',
          fileOriginalName: 'logo',
          fileName: 'DE3CnkJMayu24Q1H7N1B1fgA8oU2recH',
          fileExtension: '.png',
          fileMimeType: 'image/png',
          fileSize: '15737',
          deleteToken: '5UCWH2Vw7URmV9o9Q8XnJpmzzyL8IORB',
          __v: 0,
        },
        {
          hashes: {
            md5: 'cc35c4e5e26ffd832fb22f4108fd0c9f',
            sha256:
              'd86e19ed2246a2101aeaa981919d46b86cc4e4713123f6642353a0cfd8e9e4cc',
            sha512:
              '09f8a08cc5fad47b6684a0674c3d2969969242534b7f25ba81f2420e9df65a583b5621abd1e7d60a5aa6b794348ca0be25a33c024e7b2f0127591e4dd652cea5',
          },
          fileType: 'image',
          storage: 'local',
          tags: [],
          uploadedAt: '2020-07-18T15:54:03.256Z',
          _id: '5f131be24d3200322786b462',
          uploader: '5f131400dfc73f0a71dbd929',
          name: 'logo',
          fileOriginalName: 'logo',
          fileName: 'DE3CnkJMayu24Q1H7N1B1fgA8oU2recH',
          fileExtension: '.png',
          fileMimeType: 'image/png',
          fileSize: '15737',
          deleteToken: '5UCWH2Vw7URmV9o9Q8XnJpmzzyL8IORB',
          __v: 0,
        },
        {
          hashes: {
            md5: 'cc35c4e5e26ffd832fb22f4108fd0c9f',
            sha256:
              'd86e19ed2246a2101aeaa981919d46b86cc4e4713123f6642353a0cfd8e9e4cc',
            sha512:
              '09f8a08cc5fad47b6684a0674c3d2969969242534b7f25ba81f2420e9df65a583b5621abd1e7d60a5aa6b794348ca0be25a33c024e7b2f0127591e4dd652cea5',
          },
          fileType: 'image',
          storage: 'local',
          tags: [],
          uploadedAt: '2020-07-18T15:54:03.256Z',
          _id: '5f131be24d3200322786b462',
          uploader: '5f131400dfc73f0a71dbd929',
          name: 'logo',
          fileOriginalName: 'logo',
          fileName: 'DE3CnkJMayu24Q1H7N1B1fgA8oU2recH',
          fileExtension: '.png',
          fileMimeType: 'image/png',
          fileSize: '15737',
          deleteToken: '5UCWH2Vw7URmV9o9Q8XnJpmzzyL8IORB',
          __v: 0,
        },
        {
          hashes: {
            md5: 'cc35c4e5e26ffd832fb22f4108fd0c9f',
            sha256:
              'd86e19ed2246a2101aeaa981919d46b86cc4e4713123f6642353a0cfd8e9e4cc',
            sha512:
              '09f8a08cc5fad47b6684a0674c3d2969969242534b7f25ba81f2420e9df65a583b5621abd1e7d60a5aa6b794348ca0be25a33c024e7b2f0127591e4dd652cea5',
          },
          fileType: 'image',
          storage: 'local',
          tags: [],
          uploadedAt: '2020-07-18T15:54:03.256Z',
          _id: '5f131be24d3200322786b462',
          uploader: '5f131400dfc73f0a71dbd929',
          name: 'logo',
          fileOriginalName: 'logo',
          fileName: 'DE3CnkJMayu24Q1H7N1B1fgA8oU2recH',
          fileExtension: '.png',
          fileMimeType: 'image/png',
          fileSize: '15737',
          deleteToken: '5UCWH2Vw7URmV9o9Q8XnJpmzzyL8IORB',
          __v: 0,
        },
        {
          hashes: {
            md5: 'cc35c4e5e26ffd832fb22f4108fd0c9f',
            sha256:
              'd86e19ed2246a2101aeaa981919d46b86cc4e4713123f6642353a0cfd8e9e4cc',
            sha512:
              '09f8a08cc5fad47b6684a0674c3d2969969242534b7f25ba81f2420e9df65a583b5621abd1e7d60a5aa6b794348ca0be25a33c024e7b2f0127591e4dd652cea5',
          },
          fileType: 'image',
          storage: 'local',
          tags: [],
          uploadedAt: '2020-07-18T15:54:03.256Z',
          _id: '5f131be24d3200322786b462',
          uploader: '5f131400dfc73f0a71dbd929',
          name: 'logo',
          fileOriginalName: 'logo',
          fileName: 'DE3CnkJMayu24Q1H7N1B1fgA8oU2recH',
          fileExtension: '.png',
          fileMimeType: 'image/png',
          fileSize: '15737',
          deleteToken: '5UCWH2Vw7URmV9o9Q8XnJpmzzyL8IORB',
          __v: 0,
        },
        {
          hashes: {
            md5: 'cc35c4e5e26ffd832fb22f4108fd0c9f',
            sha256:
              'd86e19ed2246a2101aeaa981919d46b86cc4e4713123f6642353a0cfd8e9e4cc',
            sha512:
              '09f8a08cc5fad47b6684a0674c3d2969969242534b7f25ba81f2420e9df65a583b5621abd1e7d60a5aa6b794348ca0be25a33c024e7b2f0127591e4dd652cea5',
          },
          fileType: 'image',
          storage: 'local',
          tags: [],
          uploadedAt: '2020-07-18T15:54:03.256Z',
          _id: '5f131be24d3200322786b462',
          uploader: '5f131400dfc73f0a71dbd929',
          name: 'logo',
          fileOriginalName: 'logo',
          fileName: 'DE3CnkJMayu24Q1H7N1B1fgA8oU2recH',
          fileExtension: '.png',
          fileMimeType: 'image/png',
          fileSize: '15737',
          deleteToken: '5UCWH2Vw7URmV9o9Q8XnJpmzzyL8IORB',
          __v: 0,
        },

        {
          hashes: {
            md5: 'cc35c4e5e26ffd832fb22f4108fd0c9f',
            sha256:
              'd86e19ed2246a2101aeaa981919d46b86cc4e4713123f6642353a0cfd8e9e4cc',
            sha512:
              '09f8a08cc5fad47b6684a0674c3d2969969242534b7f25ba81f2420e9df65a583b5621abd1e7d60a5aa6b794348ca0be25a33c024e7b2f0127591e4dd652cea5',
          },
          fileType: 'image',
          storage: 'local',
          tags: [],
          uploadedAt: '2020-07-18T15:54:03.256Z',
          _id: '5f131be24d3200322786b462',
          uploader: '5f131400dfc73f0a71dbd929',
          name: 'logo',
          fileOriginalName: 'logo',
          fileName: 'DE3CnkJMayu24Q1H7N1B1fgA8oU2recH',
          fileExtension: '.png',
          fileMimeType: 'image/png',
          fileSize: '15737',
          deleteToken: '5UCWH2Vw7URmV9o9Q8XnJpmzzyL8IORB',
          __v: 0,
        },
        {
          hashes: {
            md5: 'cc35c4e5e26ffd832fb22f4108fd0c9f',
            sha256:
              'd86e19ed2246a2101aeaa981919d46b86cc4e4713123f6642353a0cfd8e9e4cc',
            sha512:
              '09f8a08cc5fad47b6684a0674c3d2969969242534b7f25ba81f2420e9df65a583b5621abd1e7d60a5aa6b794348ca0be25a33c024e7b2f0127591e4dd652cea5',
          },
          fileType: 'image',
          storage: 'local',
          tags: [],
          uploadedAt: '2020-07-18T15:54:03.256Z',
          _id: '5f131be24d3200322786b462',
          uploader: '5f131400dfc73f0a71dbd929',
          name: 'logo',
          fileOriginalName: 'logo',
          fileName: 'DE3CnkJMayu24Q1H7N1B1fgA8oU2recH',
          fileExtension: '.png',
          fileMimeType: 'image/png',
          fileSize: '15737',
          deleteToken: '5UCWH2Vw7URmV9o9Q8XnJpmzzyL8IORB',
          __v: 0,
        },
      ],
    }
  },
}
</script>
