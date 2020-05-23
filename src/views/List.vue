<template>
  <div>
    <div v-if="!documents">Loading...</div>
    <template v-if="documents"
      ><div v-if="documents.length == 0">
        Không tìm thấy đề nào cả!
      </div>
      <table v-if="documents.length > 0" class="table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">Tên đề</th>
            <th class="px-4 py-2">Môn thi</th>
            <th class="px-4 py-2">Ngày làm</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(doc, index) in documents" :key="index">
            <td class="flex items-center border px-4 py-2">
              <router-link
                :to="{ name: 'Document', params: { docid: doc.id } }"
                >{{
                  doc.name ? doc.name : 'Chưa đặt tên'
                }}</router-link
              >
              <button
                class="focus:outline-none"
                @click="changeName(doc.id)"
              >
                <svg
                  class="h-4 pl-2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
              </button>
            </td>
            <td class="border px-4 py-2">{{ doc.subject }}</td>
            <td class="border px-4 py-2">
              {{ formatDate(doc.date.toDate()) }}
            </td>
            <td class="pl-2">
              <button
                class="focus:outline-none font-semibold text-red-500 underline"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <router-link v-if="documents" :to="{ name: 'Home' }" class="underline"
      >Tạo đề mới nhỉ?</router-link
    >
  </div>
</template>

<script>
import { db } from '../firebase.js';

export default {
  name: 'List',
  data() {
    return {
      documents: null,
    };
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
    changeName(docid) {
      const newName = prompt('Nhập tên khác:');
      db.collection('documents')
        .doc(docid)
        .set(
          {
            name: newName,
          },
          { merge: true },
        );
    },
  },
  mounted() {
    db.collection('documents').onSnapshot(querySnapshot => {
      this.documents = [];
      querySnapshot.forEach(doc => {
        const document = { id: doc.id, ...doc.data() };
        this.documents.push(document);
        // console.log(document);
      });
      this.documents = this.documents.sort((first, second) => {
        const firstDate = first.date.toDate();
        const secondDate = second.date.toDate();
        if (firstDate > secondDate) return -1;
        if (firstDate < secondDate) return 1;
        return 0;
      });
    });
  },
};
</script>

<style></style>
