<script setup>
import adminPannelCard from "@/components/admin/adminPannelCard";
</script>
<template>
  <section>
    <h2>Admin pannel</h2>
    <div class="adminWrapper">
      <adminPannelCard title="Tags" imagePath="adminLogos/tags.png" imgAlt="Tag icon" categorie="tags" />
      <adminPannelCard title="Users" imagePath="adminLogos/users.png" imgAlt="Tag icon" categorie="users" />
      <adminPannelCard title="Authors" imagePath="adminLogos/authors.png" imgAlt="Tag icon" categorie="authors" />
      <adminPannelCard title="Books" imagePath="adminLogos/books.png" imgAlt="Tag icon" categorie="books" />
    </div>
  </section>
</template>
<style scoped>

section{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.adminWrapper{
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

section article{
  margin: 70px;
}

h2 {
  margin: 30px;
}


#disconnectBtn {
  padding: 10px;
  border: none;
  background-color: rgb(252, 120, 120);
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
