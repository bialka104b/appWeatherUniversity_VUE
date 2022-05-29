<template>
    <div>
        <header class="header">
            <div class="navbar">
                <div class="logo">
                    <h1 class="textLightBlue">
                        Your
                        <strong class="font-weight-normal textPrimary">
                            Weather
                        </strong>
                    </h1>
                </div>
                
                <nav class="d-flex flex-fill justify-content-around">
                    <div>
                        <a href="" class="nav-link">Home</a>
                    </div>
                    <div>
                        <a href="" class="nav-link">Photos</a>
                    </div>
                    <div>
                        <a href="" class="nav-link">Contacts</a>
                    </div>
                    <div class="navLink locale-changer">
                        <select v-model="$i18n.locale">
                        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
                        </select>
                    </div>
                </nav>
            </div>
        </header>
    </div>
</template>