export interface iCreateTable{
    tableName: string;
    columns: iColumns[];
    owner:   string;
}

export interface iColumns{
    name:        string;
    type:        tColumns;
    isArray?:    boolean;
    isNull?:     boolean;
    isPrimarry?: boolean;
    default?:    any;
    isAutoincrement?: boolean;
}

export type tColumns = 
"char"              | 
"aclitem"           | 
"bigint"            | 
"bigserial"         | 
"bit"               |
"bit varying"       |
"boolean"           | 
"box"               |
"bytea"             |
"character"         |
"character varying" |
"cid"               |
"cidr"              |
"cricle"            |
"date"              |
"daterange"         |
"dobule precision"  |
"gtsvector"         |
"inet"              |
"int2vector"        |
"int4range"         |
"int8range"         |
"integer"           |
"interval"          |
"json"              |
"jsonb"             |
"jsonpath"          |
"line"              |
"lseg"              |
"macaddr"           |
"macaddr8"          |
"money"             |
"name"              |
"numeric"           |
"numrange"          |
"oid"               |
"oidvector"         |
"path"              |
"pg_dependencies"   |
"pg_lsn"            |
"pg_mcv_list"       |
"pg_ndistinct"      |
"pg_node_tree"      |
"point"             |
"polygon"           |
"real"              |
"refcursor"         |
"regclass"          |
"regconfig"         |
"regdictionary"     |
"regnamespace"      |
"regoper"           |
"regoperator"       |
"regproc"           |
"regprocedure"      |
"regrole"           |
"regtype"           |
"serial"            |
"smallint"          |
"smallserial"       |
"text"              |
"tid"               |
"time with time zone"         |
"timestamp without time zone" |
"timestamp with time zone"    |
"tsquery"           |
"tsrange"           |
"tstzrange"         |
"tsvector"          |
"txid_snapshot"     |
"uuid"              |
"xid"               |
"xml" 