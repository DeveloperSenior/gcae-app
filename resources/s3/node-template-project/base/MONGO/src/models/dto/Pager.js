/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

"use strict";

/**
 * Pager Model builder object
 */
class Pager {

    /**
     * Pager Constructor
     * @param {*} actualPage 
     * @param {*} totalPage 
     * @param {*} prevPage 
     * @param {*} nextPage 
     * @param {*} data 
     */
    constructor(actualPage, totalPage, prevPage, nextPage, data) {
        this.actualPage = actualPage;
        this.totalPage = totalPage;
        this.prevPage = prevPage;
        this.nextPage = nextPage;
        this.data = data;

    }
    static Builder = class {
        constructor() {

            this.pager = new Pager();

        }
        withActualPage(actualPage) {

            this.pager.actualPage = actualPage;

            return this;

        }
        withTotalPage(totalPage) {

            this.pager.totalPage = totalPage;

            return this;

        }
        withPrevPage(prevPage) {

            this.pager.prevPage = prevPage;

            return this;

        }
        withNextPage(nextPage) {

            this.pager.nextPage = nextPage;

            return this;

        }
        withData(data) {

            this.pager.data = data;

            return this;

        }
        build() {

            return this.pager;

        }
    };
}

module.exports = { Pager }