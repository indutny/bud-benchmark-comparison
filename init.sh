#!/usr/bin/bash
/usr/sbin/ndd -set /dev/tcp tcp_smallest_anon_port 12000
/usr/sbin/ndd -set /dev/tcp tcp_largest_anon_port 65535
/usr/sbin/ndd -set /dev/tcp tcp_max_buf 2097152
/usr/sbin/ndd -set /dev/tcp tcp_xmit_hiwat 1048576
/usr/sbin/ndd -set /dev/tcp tcp_recv_hiwat 1048576
