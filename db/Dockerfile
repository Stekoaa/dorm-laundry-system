FROM mcr.microsoft.com/mssql/server:2019-latest

USER root

COPY entrypoint.sh entrypoint.sh
COPY init.sql init.sql
COPY import-data.sh import-data.sh

RUN chmod +x import-data.sh
CMD /bin/bash entrypoint.sh
