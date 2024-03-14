CREATE TABLE "public.UE" (
	"id" integer NOT NULL,
	"pk_ini" FLOAT NOT NULL,
	"pk_end" FLOAT NOT NULL,
	"desc" TEXT NOT NULL,
	CONSTRAINT "UE_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.LANDS_UT" (
	"id" TEXT NOT NULL,
	"desc" TEXT NOT NULL,
	"type" TEXT NOT NULL,
	"pk_ini" FLOAT NOT NULL,
	"pk_fin" FLOAT NOT NULL,
	"state" TEXT NOT NULL,
	"date_r" DATE NOT NULL,
	"date_a" DATE NOT NULL,
	CONSTRAINT "LANDS_UT_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.LANDS_RL" (
	"id" TEXT NOT NULL,
	"desc" TEXT NOT NULL,
	"type" TEXT NOT NULL,
	"pk_ini" FLOAT NOT NULL,
	"pk_fin" FLOAT NOT NULL,
	"state" TEXT NOT NULL,
	"date_r" DATE NOT NULL,
	"date_a" DATE NOT NULL,
	CONSTRAINT "LANDS_RL_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.DESIGN" (
	"id" integer NOT NULL,
	"desc" TEXT NOT NULL,
	"type" TEXT NOT NULL,
	"pk_ini" FLOAT NOT NULL,
	"pk_fin" FLOAT NOT NULL,
	"state" TEXT NOT NULL,
	"date_r" DATE NOT NULL,
	"date_a" DATE NOT NULL,
	CONSTRAINT "DESIGN_pk" PRIMARY KEY ("id","pk_ini","pk_fin")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.PERMITS" (
	"id" integer NOT NULL,
	"desc" TEXT NOT NULL,
	"type" TEXT NOT NULL,
	"pk_ini" FLOAT NOT NULL,
	"pk_fin" FLOAT NOT NULL,
	"state" TEXT NOT NULL,
	"date_r" DATE NOT NULL,
	"date_a" DATE NOT NULL,
	CONSTRAINT "PERMITS_pk" PRIMARY KEY ("id","pk_ini","pk_fin")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.SOCIAL" (
	"id" integer NOT NULL,
	"desc" TEXT NOT NULL,
	"pk_ini" FLOAT NOT NULL,
	"pk_fin" FLOAT NOT NULL,
	"state" TEXT NOT NULL,
	"date_r" DATE NOT NULL,
	"date_a" DATE NOT NULL,
	CONSTRAINT "SOCIAL_pk" PRIMARY KEY ("id","pk_ini","pk_fin")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.ENVIRONMENTAL" (
	"id" integer NOT NULL,
	"desc" TEXT NOT NULL,
	"pk_ini" FLOAT NOT NULL,
	"pk_fin" FLOAT NOT NULL,
	"state" TEXT NOT NULL,
	"date_r" DATE NOT NULL,
	"date_a" DATE NOT NULL,
	CONSTRAINT "ENVIRONMENTAL_pk" PRIMARY KEY ("id","pk_ini","pk_fin")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.BRIDGES" (
	"id" integer NOT NULL,
	"desc" TEXT NOT NULL,
	"pk_ini" FLOAT NOT NULL,
	"pk_fin" FLOAT NOT NULL,
	"state" TEXT NOT NULL,
	"date_r" DATE NOT NULL,
	"date_a" DATE NOT NULL,
	CONSTRAINT "BRIDGES_pk" PRIMARY KEY ("id","pk_ini","pk_fin")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.UTILITIES" (
	"id" integer NOT NULL,
	"desc" TEXT NOT NULL,
	"pk_ini" FLOAT NOT NULL,
	"pk_fin" FLOAT NOT NULL,
	"state" TEXT NOT NULL,
	"date_r" DATE NOT NULL,
	"date_a" DATE NOT NULL,
	CONSTRAINT "UTILITIES_pk" PRIMARY KEY ("id","pk_ini","pk_fin")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.MUNI" (
	"id" integer NOT NULL,
	"pk_ini" FLOAT NOT NULL,
	"pk_end" FLOAT NOT NULL,
	"name" TEXT NOT NULL,
	"dane" integer NOT NULL,
	CONSTRAINT "MUNI_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.CFRO" (
	"id" serial NOT NULL,
	"area" TEXT NOT NULL,
	"desc" TEXT NOT NULL,
	"type" TEXT NOT NULL,
	"pk_ini" FLOAT NOT NULL,
	"pk_fin" FLOAT NOT NULL,
	"state" TEXT NOT NULL,
	"date_r" DATE NOT NULL,
	"date_a" DATE NOT NULL,
	CONSTRAINT "CFRO_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

























